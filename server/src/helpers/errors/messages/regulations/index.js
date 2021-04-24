const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  NAME_REQUIRED,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  CONTENT_REQUIRED,
  CONTENT_MIN_LENGTH,
  CONTENT_MAX_LENGTH,
} = require('../../../constants/regulations');

// NAME
const nameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const nameString = {
  'string.base': TYPE_STRING,
};

const nameNotEmpty = {
  'string.empty': NAME_REQUIRED,
};

const nameMin = {
  'string.min': NAME_MIN_LENGTH,
};

const nameMax = {
  'string.max': NAME_MAX_LENGTH,
};

// CONTENT
const contentRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const contentString = {
  'string.base': TYPE_STRING,
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

const nameMessages = {
  ...nameRequired,
  ...nameString,
  ...nameMax,
  ...nameMin,
  ...nameNotEmpty,
};

const contentMessages = {
  ...contentRequired,
  ...contentString,
  ...contentMax,
  ...contentMin,
  ...contentNotEmpty,
};

module.exports = {
  nameRequired,
  nameString,
  nameNotEmpty,
  nameMax,
  nameMin,
  nameMessages,
  contentRequired,
  contentString,
  contentMax,
  contentMin,
  contentNotEmpty,
  contentMessages,
};
