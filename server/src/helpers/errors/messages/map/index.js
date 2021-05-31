const {
  mapLatLngReqiuredMessage,
  mapLatLngNotCorrectMessage,
} = require('../../../variables/map');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// MAP
const mapRequired = {
  'any.required': propertyRequiredMessage,
};

const mapNotEmpty = {
  'string.empty': mapLatLngReqiuredMessage,
};

const mapString = {
  'string.base': typeStringMessage,
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
