const { nipNotCorrectMessage } = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// NIP
const nipRequired = {
  'any.required': propertyRequiredMessage,
};

const nipString = {
  'string.base': typeStringMessage,
};

const nipPattern = {
  'string.pattern.base': nipNotCorrectMessage,
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
