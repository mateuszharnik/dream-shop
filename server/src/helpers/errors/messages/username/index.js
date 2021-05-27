const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  usernameRequiredMessage,
  usernameMinLengthMessage,
  usernameMaxLengthMessage,
  usernameAlphanumMessage,
} = require('../../../variables/users');

// USERNAME
const usernameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const usernameNotEmpty = {
  'string.empty': usernameRequiredMessage,
};

const usernameString = {
  'string.base': TYPE_STRING,
};

const usernameMin = {
  'string.min': usernameMinLengthMessage,
};

const usernameMax = {
  'string.max': usernameMaxLengthMessage,
};

const usernameAlphanum = {
  'string.alphanum': usernameAlphanumMessage,
};

const usernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
  ...usernameAlphanum,
  ...usernameMax,
  ...usernameMin,
};

module.exports = {
  usernameRequired,
  usernameNotEmpty,
  usernameString,
  usernameAlphanum,
  usernameMax,
  usernameMin,
  usernameMessages,
};
