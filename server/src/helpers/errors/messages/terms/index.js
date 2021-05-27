const {
  PROPERTY_REQUIRED,
  TYPE_BOOLEAN,
} = require('../../../constants/error-messages');
const { termsRequiredMessage } = require('../../../variables/messages');

// TERMS
const termsRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const termsOnly = {
  'any.only': termsRequiredMessage,
};

const termsBoolean = {
  'boolean.base': TYPE_BOOLEAN,
};

const termsMessages = {
  ...termsRequired,
  ...termsBoolean,
  ...termsOnly,
};

module.exports = {
  termsRequired,
  termsOnly,
  termsBoolean,
  termsMessages,
};
