exports.register = async (req, res, next) => {
  res.json({
    route: "register",
  });
};

exports.login = async (req, res, next) => {
  res.json({
    route: "login",
  });
};
