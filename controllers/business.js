const { catchError } = require("../utility/errors");
const Business = require("../models/business");
const { businessExists, getBusiness, getAllBusiness } = require("../db");
const { businessData } = require("../utility/data");

exports.createBusiness = async (req, res) => {
  const { name, type, information, workingTime, services } = req.body;

  try {
    await businessExists(name, type);

    const business = new Business({
      name,
      type,
      information,
      workingTime,
      services,
    });
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.getBusiness = async (req, res) => {
  const { businessId } = req.query;

  try {
    const business = await getBusiness(businessId);

    res.status(200).json({
      statusCode: 200,
      business: businessData(business),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.getAllBusiness = async (req, res) => {
  try {
    const businessess = await getAllBusiness();

    res.status(200).json({
      statusCode: 200,
      businessess,
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.updateCoordinates = async (req, res) => {
  const { latitude, longitude, businessId } = req.body;

  try {
    const business = await getBusiness(businessId);

    business.coordinates = { latitude, longitude };
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addComment = async (req, res) => {
  const { rating, comment, businessId } = req.body;
  const { userId } = req;

  try {
    const business = await getBusiness(businessId);

    business.comments.push({ rating, comment, userId });
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.removeComment = async (req, res) => {
  const { _id, businessId } = req.query;

  try {
    const business = await getBusiness(businessId);

    business.comments = business.comments.filter(
      (c) => c._id.toString() !== _id.toString()
    );
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addService = async (req, res) => {
  const { name, price, description, businessId } = req.body;

  try {
    const business = await getBusiness(businessId);

    business.services.push({ name, price, description });
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.removeService = async (req, res) => {
  const { _id, businessId } = req.query;

  try {
    const business = await getBusiness(businessId);

    business.services = business.services.filter(
      (s) => s._id.toString() !== _id.toString()
    );
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addServices = async (req, res) => {
  const { services, businessId } = req.body;

  try {
    const business = await getBusiness(businessId);

    services.forEach((s) => business.services.push(s));
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addWorkingDay = async (req, res) => {
  const { day, from, to, businessId } = req.body;

  try {
    const business = await getBusiness(businessId);

    business.workingTime.push({ day, from, to });
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.removeWorkingTime = async (req, res) => {
  const { _id, businessId } = req.query;

  try {
    const business = await getBusiness(businessId);

    business.workingTime = business.workingTime.filter(
      (w) => w._id.toString() !== _id.toString()
    );
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.addWorkingDays = async (req, res) => {
  const { workingDays, businessId } = req.body;

  try {
    const business = await getBusiness(businessId);

    workingDays.forEach((w) => {
      const index = business.workingTime.findIndex((i) => i.day === w.day);
      if (index > -1) {
        business.workingTime[index] = w;
        return;
      }

      business.workingTime.push(w);
    });
    const result = await business.save();

    res.status(201).json({
      statusCode: 201,
      business: businessData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};
