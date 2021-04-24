const {
  PROPERTY_REQUIRED,
  TYPE_BOOLEAN,
} = require('../../../constants/error-messages');
const { TERMS_REQUIRED } = require('../../../constants/messages');

// TERMS
const termsRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const termsOnly = {
  'any.only': TERMS_REQUIRED,
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
