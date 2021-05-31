const {
  cityNameRequiredMessage,
  cityNameMinLengthMessage,
  cityNameMaxLengthMessage,
} = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// CITY
const cityRequired = {
  'any.required': propertyRequiredMessage,
};

const cityString = {
  'string.base': typeStringMessage,
};

const cityNotEmpty = {
  'string.empty': cityNameRequiredMessage,
};

const cityMin = {
  'string.min': cityNameMinLengthMessage,
};

const cityMax = {
  'string.max': cityNameMaxLengthMessage,
};

const cityMessages = {
  ...cityRequired,
  ...cityString,
  ...cityNotEmpty,
  ...cityMax,
  ...cityMin,
};

module.exports = {
  cityRequired,
  cityString,
  cityNotEmpty,
  cityMax,
  cityMin,
  cityMessages,
};
