const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  NAME_REQUIRED,
  NAME_NOT_CORRECT,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  SURNAME_REQUIRED,
  SURNAME_NOT_CORRECT,
  SURNAME_MIN_LENGTH,
  SURNAME_MAX_LENGTH,
} = require('../../../constants/users');

// NAME
const nameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const nameString = {
  'string.base': TYPE_STRING,
};

const namePattern = {
  'string.pattern.base': NAME_NOT_CORRECT,
};

const nameNotEmpty = {
  'string.empty': NAME_REQUIRED,
};

const nameMin = {
  'string.min': NAME_MIN_LENGTH,
};

const nameMax = {
  'string.max': NAME_MAX_LENGTH,
};

// SURNAME
const surnameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const surnameString = {
  'string.base': TYPE_STRING,
};

const surnamePattern = {
  'string.pattern.base': SURNAME_NOT_CORRECT,
};

const surnameNotEmpty = {
  'string.empty': SURNAME_REQUIRED,
};

const surnameMin = {
  'string.min': SURNAME_MIN_LENGTH,
};

const surnameMax = {
  'string.max': SURNAME_MAX_LENGTH,
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
