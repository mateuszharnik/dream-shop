const {
  subjectRequiredMessage,
  subjectMinLengthMessage,
  subjectMaxLengthMessage,
  messageRequiredMessage,
  messageMinLengthMessage,
  messageMaxLengthMessage,
} = require('../../../variables/messages');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// SUBJECT
const subjectRequired = {
  'any.required': propertyRequiredMessage,
};

const subjectString = {
  'string.base': typeStringMessage,
};

const subjectNotEmpty = {
  'string.empty': subjectRequiredMessage,
};

const subjectMin = {
  'string.min': subjectMinLengthMessage,
};

const subjectMax = {
  'string.max': subjectMaxLengthMessage,
};

// MESSAGE
const messageRequired = {
  'any.required': propertyRequiredMessage,
};

const messageString = {
  'string.base': typeStringMessage,
};

const messageNotEmpty = {
  'string.empty': messageRequiredMessage,
};

const messageMin = {
  'string.min': messageMinLengthMessage,
};

const messageMax = {
  'string.max': messageMaxLengthMessage,
};

const subjectMessages = {
  ...subjectRequired,
  ...subjectString,
  ...subjectNotEmpty,
  ...subjectMin,
  ...subjectMax,
};

const messageMessages = {
  ...messageRequired,
  ...messageString,
  ...messageNotEmpty,
  ...messageMin,
  ...messageMax,
};

module.exports = {
  subjectRequired,
  subjectString,
  subjectNotEmpty,
  subjectMin,
  subjectMax,
  subjectMessages,
  messageRequired,
  messageString,
  messageNotEmpty,
  messageMin,
  messageMax,
  messageMessages,
};
