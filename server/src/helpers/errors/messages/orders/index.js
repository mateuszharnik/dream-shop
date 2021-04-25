const {
  PROPERTY_REQUIRED,
  TYPE_BOOLEAN,
} = require('../../../constants/error-messages');

// IS PAID
const isPaidRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const isPaidBoolean = {
  'boolean.base': TYPE_BOOLEAN,
};

const isPaidMessages = {
  ...isPaidRequired,
  ...isPaidBoolean,
};

module.exports = {
  isPaidRequired,
  isPaidBoolean,
  isPaidMessages,
};
