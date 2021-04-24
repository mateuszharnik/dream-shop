const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
  TYPE_NUMBER,
} = require('../../../constants/error-messages');
const {
  RESET_PASSWORD_TOKE_REQUIRED,
} = require('../../../constants/auth');

// RESET PASSWORD TOKEN
const resetPasswordTokenRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const resetPasswordTokenString = {
  'string.base': TYPE_STRING,
};

const resetPasswordTokenNotEmpty = {
  'string.empty': RESET_PASSWORD_TOKE_REQUIRED,
};

// RESET PASSWORD TOKEN EXP
const resetPasswordTokenExpRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const resetPasswordTokenExpNumber = {
  'number.base': TYPE_NUMBER,
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
