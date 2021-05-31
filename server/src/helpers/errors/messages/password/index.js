const {
  passwordRequiredMessage,
  passwordMinLengthMessage,
  passwordMaxLengthMessage,
  newPasswordRequiredMessage,
  newPasswordMinLengthMessage,
  newPasswordMaxLengthMessage,
  passwordsNotMatchMessage,
} = require('../../../variables/users');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// PASSWORD
const passwordRequired = {
  'any.required': propertyRequiredMessage,
};

const passwordNotEmpty = {
  'string.empty': passwordRequiredMessage,
};

const passwordString = {
  'string.base': typeStringMessage,
};

const passwordMin = {
  'string.min': passwordMinLengthMessage,
};

const passwordMax = {
  'string.max': passwordMaxLengthMessage,
};

// NEW PASSWORD
const newPasswordRequired = {
  'any.required': propertyRequiredMessage,
};

const newPasswordNotEmpty = {
  'string.empty': newPasswordRequiredMessage,
};

const newPasswordString = {
  'string.base': typeStringMessage,
};

const newPasswordMin = {
  'string.min': newPasswordMinLengthMessage,
};

const newPasswordMax = {
  'string.max': newPasswordMaxLengthMessage,
};

// CONFIRM PASSWORD
const confirmPasswordRequired = {
  'any.required': propertyRequiredMessage,
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
