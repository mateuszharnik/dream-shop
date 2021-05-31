const { phoneNotCorrectMessage } = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// PHONE
const phoneRequired = {
  'any.required': propertyRequiredMessage,
};

const phoneString = {
  'string.base': typeStringMessage,
};

const phonePattern = {
  'string.pattern.base': phoneNotCorrectMessage,
};

const phoneMessages = {
  ...phoneRequired,
  ...phoneString,
  ...phonePattern,
};

module.exports = {
  phoneRequired,
  phoneString,
  phonePattern,
  phoneMessages,
};
