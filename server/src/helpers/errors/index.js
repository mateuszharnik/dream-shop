const { loginErrors } = require('./login');
const { emailErrors } = require('./email');
const { passwordsErrors } = require('./password');
const { idErrors } = require('./id');

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
const checkRecoveryLinkErrors = createErrorsChecker(emailErrors);
const checkRecoveryPasswordErrors = createErrorsChecker(passwordsErrors);
const checkIdErrors = createErrorsChecker(idErrors);

module.exports = {
  checkLoginErrors,
  responseWithError,
  checkRecoveryLinkErrors,
  checkRecoveryPasswordErrors,
  checkIdErrors,
};
