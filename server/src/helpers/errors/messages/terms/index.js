const { termsRequiredMessage } = require('../../../variables/messages');
const {
  propertyRequiredMessage,
  typeBooleanMessage,
} = require('../../../variables/error-messages');

// TERMS
const termsRequired = {
  'any.required': propertyRequiredMessage,
};

const termsOnly = {
  'any.only': termsRequiredMessage,
};

const termsBoolean = {
  'boolean.base': typeBooleanMessage,
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
