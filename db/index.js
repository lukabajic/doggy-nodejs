const userUtility = require("./user");
const businessUtility = require("./business");

module.exports = {
  ...userUtility,
  ...businessUtility,
};
