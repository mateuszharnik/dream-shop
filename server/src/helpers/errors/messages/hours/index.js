const { hoursNotCorrectMessage } = require('../../../variables/contact');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// WORKING HOURS
const workingHoursRequired = {
  'any.required': propertyRequiredMessage,
};

const workingHoursString = {
  'string.base': typeStringMessage,
};

const workingHoursPattern = {
  'string.pattern.base': hoursNotCorrectMessage,
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
