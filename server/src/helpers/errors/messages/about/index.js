const {
  aboutMinLengthMessage,
  aboutMaxLengthMessage,
} = require('../../../variables/about');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// INFORMATION
const informationRequired = {
  'any.required': propertyRequiredMessage,
};

const informationString = {
  'string.base': typeStringMessage,
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
