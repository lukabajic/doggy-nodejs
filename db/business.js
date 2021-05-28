const Business = require("../models/business");
const Recommended = require("../models/recommended");
const { throwError } = require("../utility/errors");

exports.businessExists = async (name, type) => {
  const business = await Business.findOne({ name });
  business &&
    business.type === type &&
    throwError("Business with this name already exists.", 409);
};

exports.getBusiness = async (id) => {
  const business = await Business.findById(id);
  !business && throwError("Couldn't find business with this id.", 404);

  return business;
};

exports.getAllBusiness = async () => {
  const businesses = await Business.find({}).select(
    "_id name coordinates comments"
  );
  !businesses && throwError("Couldn't find any business.", 404);

  return businesses;
};

exports.recommendedExists = async (id) => {
  const recommended = await Recommended.findOne({ businessId: id });
  recommended && throwError("Recommended with this name already exists.", 409);
};
