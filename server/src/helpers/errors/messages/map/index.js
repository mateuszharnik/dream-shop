const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  MAP_LAT_LNG_REQIURED,
  MAP_LAT_LNG_NOT_CORRECT,
} = require('../../../constants/map');

const mapRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const mapNotEmpty = {
  'string.empty': MAP_LAT_LNG_REQIURED,
};

const mapString = {
  'string.base': TYPE_STRING,
};

const mapPattern = {
  'string.pattern.base': MAP_LAT_LNG_NOT_CORRECT,
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
