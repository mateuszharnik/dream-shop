const {
  usernameRequiredMessage,
  usernameMinLengthMessage,
  usernameMaxLengthMessage,
  usernameAlphanumMessage,
} = require('../../../variables/users');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// USERNAME
const usernameRequired = {
  'any.required': propertyRequiredMessage,
};

const usernameNotEmpty = {
  'string.empty': usernameRequiredMessage,
};

const usernameString = {
  'string.base': typeStringMessage,
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
