const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const { ID_NOT_CORRECT, ID_REQUIRED } = require('../../../constants/id');

// DATABASE ID
const idRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const idString = {
  'string.base': TYPE_STRING,
};

const idNotEmpty = {
  'string.empty': ID_REQUIRED,
};

const idPattern = {
  'string.pattern.base': ID_NOT_CORRECT,
};

// RESET PASSWORD TOKEN ID
const resetPasswordIdRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const resetPasswordIdString = {
  'string.base': TYPE_STRING,
};

const resetPasswordIdNotEmpty = {
  'string.empty': ID_REQUIRED,
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
