const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  STREET_NAME_REQUIRED,
  STREET_NAME_MAX_LENGTH,
  STREET_NAME_MIN_LENGTH,
} = require('../../../constants/contact');

// STREET
const streetRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const streetString = {
  'string.base': TYPE_STRING,
};

const streetNotEmpty = {
  'string.empty': STREET_NAME_REQUIRED,
};

const streetMin = {
  'string.min': STREET_NAME_MIN_LENGTH,
};

const streetMax = {
  'string.max': STREET_NAME_MAX_LENGTH,
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
