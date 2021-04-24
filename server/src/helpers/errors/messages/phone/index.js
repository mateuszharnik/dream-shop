const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const { PHONE_NOT_CORRECT } = require('../../../constants/contact');

// PHONE
const phoneRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const phoneString = {
  'string.base': TYPE_STRING,
};

const phonePattern = {
  'string.pattern.base': PHONE_NOT_CORRECT,
};

const phoneMessages = {
  ...phoneRequired,
  ...phoneString,
  ...phonePattern,
};

module.exports = {
  phoneRequired,
  phoneString,
  phonePattern,
  phoneMessages,
};
