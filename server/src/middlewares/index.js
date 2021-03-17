const { responseWithError } = require('../helpers/errors');

const createData = (req, res, next) => {
  req.data = {};

  next();
};

const createResponseWithError = (req, res, next) => {
  req.data.responseWithError = responseWithError.bind(null, res, next);

  next();
};

module.exports = {
  createData,
  createResponseWithError,
};
