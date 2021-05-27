const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  aboutMinLengthMessage,
  aboutMaxLengthMessage,
} = require('../../../variables/about');

// INFORMATION
const informationRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const informationString = {
  'string.base': TYPE_STRING,
};

const informationMin = {
  'string.min': aboutMinLengthMessage,
};

const informationMax = {
  'string.max': aboutMaxLengthMessage,
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
