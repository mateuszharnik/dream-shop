const {
  propertyRequiredMessage,
  typeBooleanMessage,
} = require('../../../variables/error-messages');

// IS PAID
const isPaidRequired = {
  'any.required': propertyRequiredMessage,
};

const isPaidBoolean = {
  'boolean.base': typeBooleanMessage,
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
