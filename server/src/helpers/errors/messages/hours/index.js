const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  HOURS_NOT_CORRECT,
} = require('../../../constants/contact');

// WORKING HOURS
const workingHoursRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const workingHoursString = {
  'string.base': TYPE_STRING,
};

const workingHoursPattern = {
  'string.pattern.base': HOURS_NOT_CORRECT,
};

const workingHoursMessages = {
  ...workingHoursRequired,
  ...workingHoursString,
  ...workingHoursPattern,
};

module.exports = {
  workingHoursRequired,
  workingHoursString,
  workingHoursPattern,
  workingHoursMessages,
};
