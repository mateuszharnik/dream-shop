const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  passwordRequiredMessage,
  passwordMinLengthMessage,
  passwordMaxLengthMessage,
  newPasswordRequiredMessage,
  newPasswordMinLengthMessage,
  newPasswordMaxLengthMessage,
  passwordsNotMatchMessage,
} = require('../../../variables/users');

// PASSWORD
const passwordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const passwordNotEmpty = {
  'string.empty': passwordRequiredMessage,
};

const passwordString = {
  'string.base': TYPE_STRING,
};

const passwordMin = {
  'string.min': passwordMinLengthMessage,
};

const passwordMax = {
  'string.max': passwordMaxLengthMessage,
};

// NEW PASSWORD
const newPasswordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const newPasswordNotEmpty = {
  'string.empty': newPasswordRequiredMessage,
};

const newPasswordString = {
  'string.base': TYPE_STRING,
};

const newPasswordMin = {
  'string.min': newPasswordMinLengthMessage,
};

const newPasswordMax = {
  'string.max': newPasswordMaxLengthMessage,
};

// CONFIRM PASSWORD
const confirmPasswordRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const confirmPasswordNotMatch = {
  'any.only': passwordsNotMatchMessage,
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
