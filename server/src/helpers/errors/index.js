const { loginErrors } = require('./login');

const responseWithError = (res, next, status, message) => {
  const error = new Error(message);
  res.status(status);
  next(error);
};

const checkErrorProp = (error, prop) => error.details[0].path[0] === prop;
const checkErrorType = (error, type) => error.details[0].type === type;

const createErrorsChecker = (errors) => (error, res, next) => errors.some(({
  prop, type, message, status,
}) => {
  if (checkErrorProp(error, prop) && checkErrorType(error, type)) {
    responseWithError(res, next, status, message);
    return true;
  }
  return false;
});


const checkLoginErrors = createErrorsChecker(loginErrors);

module.exports = { checkLoginErrors, responseWithError };
