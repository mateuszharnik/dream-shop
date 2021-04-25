const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  CONTENT_REQUIRED,
  CONTENT_MIN_LENGTH,
  CONTENT_MAX_LENGTH,
  CONTENT_NOT_CORRECT,
} = require('../../../constants/comments');

// CONTENT
const contentRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const contentString = {
  'string.base': TYPE_STRING,
};

const contentPattern = {
  'string.pattern.base': CONTENT_NOT_CORRECT,
};

const contentNotEmpty = {
  'string.empty': CONTENT_REQUIRED,
};

const contentMin = {
  'string.min': CONTENT_MIN_LENGTH,
};

const contentMax = {
  'string.max': CONTENT_MAX_LENGTH,
};

const contentMessages = {
  ...contentRequired,
  ...contentString,
  ...contentNotEmpty,
  ...contentMax,
  ...contentMin,
  ...contentPattern,
};

module.exports = {
  contentRequired,
  contentString,
  contentNotEmpty,
  contentMax,
  contentMin,
  contentPattern,
  contentMessages,
};
