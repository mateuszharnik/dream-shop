const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  emailRequiredMessage,
  emailNotCorrectMessage,
} = require('../../../variables/newsletter');

// EMAIL
const emailRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const emailNotEmpty = {
  'string.empty': emailRequiredMessage,
};

const emailString = {
  'string.base': TYPE_STRING,
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
