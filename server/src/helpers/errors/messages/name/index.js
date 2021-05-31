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
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// NAME
const nameRequired = {
  'any.required': propertyRequiredMessage,
};

const nameString = {
  'string.base': typeStringMessage,
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
  'any.required': propertyRequiredMessage,
};

const surnameString = {
  'string.base': typeStringMessage,
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
