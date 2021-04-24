const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const { NIP_NOT_CORRECT } = require('../../../constants/contact');

// NIP
const nipRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const nipString = {
  'string.base': TYPE_STRING,
};

const nipPattern = {
  'string.pattern.base': NIP_NOT_CORRECT,
};

const nipMessages = {
  ...nipRequired,
  ...nipString,
  ...nipPattern,
};

module.exports = {
  nipRequired,
  nipString,
  nipPattern,
  nipMessages,
};
