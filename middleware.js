const setContentTypeDefault = () => (req, res, next) => {
  req.headers["content-type"] = "application/json";
  next();
};

module.exports = { setContentTypeDefault };
