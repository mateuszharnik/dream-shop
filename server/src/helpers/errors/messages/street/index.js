const {
  streetNameRequiredMessage,
  streetNameMaxLengthMessage,
  streetNameMinLengthMessage,
} = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// STREET
const streetRequired = {
  'any.required': propertyRequiredMessage,
};

const streetString = {
  'string.base': typeStringMessage,
};

const streetNotEmpty = {
  'string.empty': streetNameRequiredMessage,
};

const streetMin = {
  'string.min': streetNameMinLengthMessage,
};

const streetMax = {
  'string.max': streetNameMaxLengthMessage,
};

const streetMessages = {
  ...streetRequired,
  ...streetString,
  ...streetNotEmpty,
  ...streetMax,
  ...streetMin,
};

module.exports = {
  streetRequired,
  streetString,
  streetNotEmpty,
  streetMax,
  streetMin,
  streetMessages,
};
