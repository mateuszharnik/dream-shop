const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  mapLatLngReqiuredMessage,
  mapLatLngNotCorrectMessage,
} = require('../../../variables/map');

// MAP
const mapRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const mapNotEmpty = {
  'string.empty': mapLatLngReqiuredMessage,
};

const mapString = {
  'string.base': TYPE_STRING,
};

const mapPattern = {
  'string.pattern.base': mapLatLngNotCorrectMessage,
};

const mapMessages = {
  ...mapRequired,
  ...mapNotEmpty,
  ...mapString,
  ...mapPattern,
};

module.exports = {
  mapRequired,
  mapNotEmpty,
  mapString,
  mapPattern,
  mapMessages,
};
