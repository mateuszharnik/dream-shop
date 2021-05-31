const {
  emailRequiredMessage,
  emailNotCorrectMessage,
} = require('../../../variables/newsletter');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// EMAIL
const emailRequired = {
  'any.required': propertyRequiredMessage,
};

const emailNotEmpty = {
  'string.empty': emailRequiredMessage,
};

const emailString = {
  'string.base': typeStringMessage,
};

const emailPattern = {
  'string.pattern.base': emailNotCorrectMessage,
};

const emailMessages = {
  ...emailRequired,
  ...emailNotEmpty,
  ...emailString,
  ...emailPattern,
};

module.exports = {
  emailRequired,
  emailNotEmpty,
  emailString,
  emailPattern,
  emailMessages,
};
