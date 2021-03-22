const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");

const { getUserId } = require("../utility/jwt");
const { getUser, getUserByEmail } = require("../db");
const Animal = require("../models/animal").default;
const { catchError, throwError } = require("../utility/errors");
const userData = require("../utility/userData");
const { passwordMail } = require("../utility/sendgrid");

cloudinary.config({
  cloud_name: "dz8qvnynp",
  api_key: "461536148988842",
  api_secret: "l0IhWVobladvO4CvL7O9qpY5STo",
});

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

exports.verifyUserEmail = async (req, res, next) => {
  const { token } = req.params;
  const userId = getUserId(token);

  try {
    const user = await getUser(userId);

    user.emailVerified && res.render("verification-success", { already: true });

    user.emailVerified = true;

    await user.save();

    res.render("verification-success", { already: false });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addAnimal = async (req, res, next) => {
  const { userId } = req;
  const { imageName, ...rest } = req.body;
  const { imageData } = req.files;

  try {
    const user = await getUser(userId);

    (!imageData || !imageName) && throwError("Please provide an image", 404);
    const image = await cloudinary.uploader.upload(imageData.path);

    const animal = new Animal({ ...rest, imageName, imageUrl: image.url });

    user.animals.push(animal);
    const result = await user.save();

    await animal.save();

    res.status(201).json({
      statusCode: 201,
      user: userData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    const pw = capitalize(Math.random().toString(36).slice(-8));
    const hashedPassword = await bcrypt.hash(pw, 12);

    user.password = hashedPassword;

    await passwordMail(email, pw);
    await user.save();

    res.status(200).json({
      statusCode: 200,
      message: "Password sent to the provided email.",
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.changePassword = async (req, res) => {
  const { userId } = req;
  const { password } = req.body;

  try {
    const user = await getUser(userId);

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      statusCode: 200,
      message: "Successfully changed password.",
    });
  } catch (err) {
    catchError(res, err);
  }
};