const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  STREET_NUMBER_REQUIRED,
  STREET_NUMBER_NOT_CORRECT,
} = require('../../../constants/contact');

// STREET NUMBER
const streetNumberRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const streetNumberString = {
  'string.base': TYPE_STRING,
};

const streetNumberNotEmpty = {
  'string.empty': STREET_NUMBER_REQUIRED,
};

const streetNumberPattern = {
  'string.pattern.base': STREET_NUMBER_NOT_CORRECT,
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
