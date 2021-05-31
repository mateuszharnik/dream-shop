const {
  zipCodeRequiredMessage,
  zipCodeNotCorrectMessage,
} = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// ZIP CODE
const zipCodeRequired = {
  'any.required': propertyRequiredMessage,
};

const zipCodeString = {
  'string.base': typeStringMessage,
};

const zipCodeNotEmpty = {
  'string.empty': zipCodeRequiredMessage,
};

const zipCodePattern = {
  'string.pattern.base': zipCodeNotCorrectMessage,
};

const zipCodeMessages = {
  ...zipCodeRequired,
  ...zipCodeString,
  ...zipCodeNotEmpty,
  ...zipCodePattern,
};

module.exports = {
  zipCodeRequired,
  zipCodeString,
  zipCodeNotEmpty,
  zipCodePattern,
  zipCodeMessages,
};
