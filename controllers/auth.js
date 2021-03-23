const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const querystring = require("querystring");

const User = require("../models/user");
const { userExists, getUserByEmail, passwordMatches } = require("../db");
const { generateToken } = require("../utility/jwt");
const userData = require("../utility/userData");
const { catchError } = require("../utility/errors");
const { sendVerificationMail } = require("../utility/sendgrid");

const GOOGLE_CLIENT_ID =
  "137804217104-9mrgi9645gtmeetj88fjqsot2uo6t3bi.apps.googleusercontent.com";
const FACEBOOK_CLIENT_ID = "878938519630253";
const FACEBOOK_CLIENT_SECRET = "553c8c6011689dd6ac36830dc41fd61a";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const userResponse = (user, token) => ({
  statusCode: 201,
  token,
  expiresIn: 14 * 24 * 60 * 60 * 1000,
  user: userData(user),
});

const externalAuth = async ({ res, email, ...rest }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const user = new User({ email, ...rest });
    const result = await user.save();

    const token = generateToken(result._id, email);

    res.status(201).json(userResponse(result, token));
  } else {
    const token = generateToken(user._id, email);

    res.status(200).json(userResponse(user, token));
  }
};

exports.register = async (req, res, next) => {
  const { email, password, fullName, phone } = req.body;

  try {
    await userExists(email);

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword, fullName, phone });
    const result = await user.save();

    const token = generateToken(result._id, result.email);

    await sendVerificationMail(token, email);

    res.status(201).json(userResponse(result, token));
  } catch (err) {
    catchError(res, err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    await passwordMatches(password, user.password);

    const token = generateToken(user._id, user.email);

    res.status(201).json(userResponse(user, token));
  } catch (err) {
    catchError(res, err);
  }
};

exports.google = async (req, res, next) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name: fullName, phone } = await ticket.getPayload();

    externalAuth({ res, email, fullName, phone });
  } catch (err) {
    catchError(res, err);
  }
};

exports.facebook = async (req, res) => {
  const { accessToken, id } = req.body;

  try {
    const params = querystring.stringify({
      fields: "name,email",
      access_token: accessToken,
      client_id: FACEBOOK_CLIENT_ID,
      client_secret: FACEBOOK_CLIENT_SECRET,
    });

    const response = await fetch(`https://graph.facebook.com/${id}?${params}`, {
      method: "GET",
    });
    const { name: fullName, email } = await response.json();

    externalAuth({ res, email, fullName });
  } catch (err) {
    catchError(res, err);
  }
};
