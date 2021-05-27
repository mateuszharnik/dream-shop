const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  subjectRequiredMessage,
  subjectMinLengthMessage,
  subjectMaxLengthMessage,
  messageRequiredMessage,
  messageMinLengthMessage,
  messageMaxLengthMessage,
} = require('../../../variables/messages');

// SUBJECT
const subjectRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const subjectString = {
  'string.base': TYPE_STRING,
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
  'any.required': PROPERTY_REQUIRED,
};

const messageString = {
  'string.base': TYPE_STRING,
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
