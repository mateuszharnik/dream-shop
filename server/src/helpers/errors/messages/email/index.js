const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  EMAIL_REQUIRED,
  EMAIL_NOT_CORRECT,
} = require('../../../constants/newsletter');

const emailRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const emailNotEmpty = {
  'string.empty': EMAIL_REQUIRED,
};

const emailString = {
  'string.base': TYPE_STRING,
};

const emailPattern = {
  'string.pattern.base': EMAIL_NOT_CORRECT,
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
