const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  USERNAME_REQUIRED,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_ALPHANUM,
} = require('../../../constants/users');

// USERNAME
const usernameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const usernameNotEmpty = {
  'string.empty': USERNAME_REQUIRED,
};

const usernameString = {
  'string.base': TYPE_STRING,
};

const usernameMin = {
  'string.min': USERNAME_MIN_LENGTH,
};

const usernameMax = {
  'string.max': USERNAME_MAX_LENGTH,
};

const usernameAlphanum = {
  'string.alphanum': USERNAME_ALPHANUM,
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
