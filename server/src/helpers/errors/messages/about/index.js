const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  ABOUT_MIN_LENGTH,
  ABOUT_MAX_LENGTH,
} = require('../../../constants/about');

const informationRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const informationString = {
  'string.base': TYPE_STRING,
};

const informationMin = {
  'string.min': ABOUT_MIN_LENGTH,
};

const informationMax = {
  'string.max': ABOUT_MAX_LENGTH,
};

const informationMessages = {
  ...informationRequired,
  ...informationString,
  ...informationMax,
  ...informationMin,
};

module.exports = {
  informationRequired,
  informationString,
  informationMax,
  informationMin,
  informationMessages,
};
