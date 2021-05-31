const {
  idNotCorrectMessage,
  idRequiredMessage,
} = require('../../../variables/id');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// DATABASE ID
const idRequired = {
  'any.required': propertyRequiredMessage,
};

const idString = {
  'string.base': typeStringMessage,
};

const idNotEmpty = {
  'string.empty': idRequiredMessage,
};

const idPattern = {
  'string.pattern.base': idNotCorrectMessage,
};

// RESET PASSWORD TOKEN ID
const resetPasswordIdRequired = {
  'any.required': propertyRequiredMessage,
};

const resetPasswordIdString = {
  'string.base': typeStringMessage,
};

const resetPasswordIdNotEmpty = {
  'string.empty': idRequiredMessage,
};

const idMessages = {
  ...idRequired,
  ...idString,
  ...idNotEmpty,
  ...idPattern,
};

const resetPasswordIdMessages = {
  ...resetPasswordIdRequired,
  ...resetPasswordIdString,
  ...resetPasswordIdNotEmpty,
};

module.exports = {
  idRequired,
  idString,
  idNotEmpty,
  idPattern,
  resetPasswordIdRequired,
  resetPasswordIdString,
  resetPasswordIdNotEmpty,
  idMessages,
  resetPasswordIdMessages,
};
