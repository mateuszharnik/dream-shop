const { resetPasswordTokeRequiredMessage } = require('../../../variables/auth');
const {
  propertyRequiredMessage,
  typeStringMessage,
  typeNumberMessage,
} = require('../../../variables/error-messages');

// RESET PASSWORD TOKEN
const resetPasswordTokenRequired = {
  'any.required': propertyRequiredMessage,
};

const resetPasswordTokenString = {
  'string.base': typeStringMessage,
};

const resetPasswordTokenNotEmpty = {
  'string.empty': resetPasswordTokeRequiredMessage,
};

// RESET PASSWORD TOKEN EXP
const resetPasswordTokenExpRequired = {
  'any.required': propertyRequiredMessage,
};

const resetPasswordTokenExpNumber = {
  'number.base': typeNumberMessage,
};

const resetPasswordTokenMessages = {
  ...resetPasswordTokenRequired,
  ...resetPasswordTokenString,
  ...resetPasswordTokenNotEmpty,
};

const resetPasswordTokenExpMessages = {
  ...resetPasswordTokenExpRequired,
  ...resetPasswordTokenExpNumber,
};

module.exports = {
  resetPasswordTokenRequired,
  resetPasswordTokenString,
  resetPasswordTokenNotEmpty,
  resetPasswordTokenExpRequired,
  resetPasswordTokenExpNumber,
  resetPasswordTokenMessages,
  resetPasswordTokenExpMessages,
};
