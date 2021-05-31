const {
  streetNumberRequiredMessage,
  streetNumberNotCorrectMessage,
} = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// STREET NUMBER
const streetNumberRequired = {
  'any.required': propertyRequiredMessage,
};

const streetNumberString = {
  'string.base': typeStringMessage,
};

const streetNumberNotEmpty = {
  'string.empty': streetNumberRequiredMessage,
};

const streetNumberPattern = {
  'string.pattern.base': streetNumberNotCorrectMessage,
};

const streetNumberMessages = {
  ...streetNumberRequired,
  ...streetNumberString,
  ...streetNumberNotEmpty,
  ...streetNumberPattern,
};

module.exports = {
  streetNumberRequired,
  streetNumberString,
  streetNumberNotEmpty,
  streetNumberPattern,
  streetNumberMessages,
};
