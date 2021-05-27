const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  nameRequiredMessage,
  nameNotCorrectMessage,
  nameMinLengthMessage,
  nameMaxLengthMessage,
  surnameRequiredMessage,
  surnameNotCorrectMessage,
  surnameMinLengthMessage,
  surnameMaxLengthMessage,
} = require('../../../variables/users');

// NAME
const nameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const nameString = {
  'string.base': TYPE_STRING,
};

const namePattern = {
  'string.pattern.base': nameNotCorrectMessage,
};

const nameNotEmpty = {
  'string.empty': nameRequiredMessage,
};

const nameMin = {
  'string.min': nameMinLengthMessage,
};

const nameMax = {
  'string.max': nameMaxLengthMessage,
};

// SURNAME
const surnameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const surnameString = {
  'string.base': TYPE_STRING,
};

const surnamePattern = {
  'string.pattern.base': surnameNotCorrectMessage,
};

const surnameNotEmpty = {
  'string.empty': surnameRequiredMessage,
};

const surnameMin = {
  'string.min': surnameMinLengthMessage,
};

const surnameMax = {
  'string.max': surnameMaxLengthMessage,
};

const nameMessages = {
  ...nameRequired,
  ...nameString,
  ...namePattern,
  ...nameMax,
  ...nameMin,
  ...nameNotEmpty,
};

const surnameMessages = {
  ...surnameRequired,
  ...surnameString,
  ...surnamePattern,
  ...surnameMax,
  ...surnameMin,
  ...surnameNotEmpty,
};

module.exports = {
  nameRequired,
  nameString,
  namePattern,
  nameMax,
  nameNotEmpty,
  nameMin,
  nameMessages,
  surnameRequired,
  surnameString,
  surnamePattern,
  surnameMax,
  surnameNotEmpty,
  surnameMin,
  surnameMessages,
};
