const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  SUBJECT_REQUIRED,
  SUBJECT_MIN_LENGTH,
  SUBJECT_MAX_LENGTH,
  MESSAGE_REQUIRED,
  MESSAGE_MIN_LENGTH,
  MESSAGE_MAX_LENGTH,
} = require('../../../constants/messages');

// SUBJECT
const subjectRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const subjectString = {
  'string.base': TYPE_STRING,
};

const subjectNotEmpty = {
  'string.empty': SUBJECT_REQUIRED,
};

const subjectMin = {
  'string.min': SUBJECT_MIN_LENGTH,
};

const subjectMax = {
  'string.max': SUBJECT_MAX_LENGTH,
};

// MESSAGE
const messageRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const messageString = {
  'string.base': TYPE_STRING,
};

const messageNotEmpty = {
  'string.empty': MESSAGE_REQUIRED,
};

const messageMin = {
  'string.min': MESSAGE_MIN_LENGTH,
};

const messageMax = {
  'string.max': MESSAGE_MAX_LENGTH,
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
