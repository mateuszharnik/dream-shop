const { NODE_ENV } = require('../../config');
const {
  statusCodesConstants,
  enviromentConstants,
} = require('../../helpers/constants');

const { NOT_FOUND, OK, INTERNAL_SERVER_ERROR } = statusCodesConstants;
const { PRODUCTION } = enviromentConstants;

const notFound = (req, res, next) => {
  const error = new Error(`Nie znaleziono ${req.originalUrl}`);
  res.status(NOT_FOUND);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = ({ message, stack }, req, res, next) => {
  const status = res.statusCode === OK ? INTERNAL_SERVER_ERROR : res.statusCode;
  res.status(status).json({
    message,
    stack: NODE_ENV === PRODUCTION ? '💩' : stack,
  });
};

module.exports = { notFound, errorHandler };
