const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  CITY_NAME_REQUIRED,
  CITY_NAME_MIN_LENGTH,
  CITY_NAME_MAX_LENGTH,
} = require('../../../constants/contact');

// CITY
const cityRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const cityString = {
  'string.base': TYPE_STRING,
};

const cityNotEmpty = {
  'string.empty': CITY_NAME_REQUIRED,
};

const cityMin = {
  'string.min': CITY_NAME_MIN_LENGTH,
};

const cityMax = {
  'string.max': CITY_NAME_MAX_LENGTH,
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
