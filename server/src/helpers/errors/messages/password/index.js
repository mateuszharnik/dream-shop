const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_MIN_LENGTH,
  NEW_PASSWORD_MAX_LENGTH,
  PASSWORDS_NOT_MATCH,
} = require('../../../constants/users');

// PASSWORD
const passwordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const passwordNotEmpty = {
  'string.empty': PASSWORD_REQUIRED,
};

const passwordString = {
  'string.base': TYPE_STRING,
};

const passwordMin = {
  'string.min': PASSWORD_MIN_LENGTH,
};

const passwordMax = {
  'string.max': PASSWORD_MAX_LENGTH,
};

// NEW PASSWORD
const newPasswordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const newPasswordNotEmpty = {
  'string.empty': NEW_PASSWORD_REQUIRED,
};

const newPasswordString = {
  'string.base': TYPE_STRING,
};

const newPasswordMin = {
  'string.min': NEW_PASSWORD_MIN_LENGTH,
};

const newPasswordMax = {
  'string.max': NEW_PASSWORD_MAX_LENGTH,
};

// CONFIRM PASSWORD
const confirmPasswordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const confirmPasswordNotMatch = {
  'any.only': PASSWORDS_NOT_MATCH,
};

const passwordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
  ...passwordMin,
  ...passwordMax,
};

const newPasswordMessages = {
  ...newPasswordRequired,
  ...newPasswordNotEmpty,
  ...newPasswordString,
  ...newPasswordMin,
  ...newPasswordMax,
};

const confirmPasswordMessages = {
  ...confirmPasswordRequired,
  ...confirmPasswordNotMatch,
};

module.exports = {
  passwordRequired,
  passwordNotEmpty,
  passwordString,
  passwordMin,
  passwordMax,
  confirmPasswordRequired,
  confirmPasswordNotMatch,
  passwordMessages,
  confirmPasswordMessages,
  newPasswordRequired,
  newPasswordNotEmpty,
  newPasswordString,
  newPasswordMin,
  newPasswordMax,
  newPasswordMessages,
};
