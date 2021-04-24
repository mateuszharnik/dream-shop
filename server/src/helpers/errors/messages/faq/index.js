const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  CATEGORY_NOT_CORRECT,
  TITLE_REQUIRED,
  TITLE_NOT_CORRECT,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  CONTENT_REQUIRED,
  CONTENT_MIN_LENGTH,
  CONTENT_MAX_LENGTH,
} = require('../../../constants/faq');

// CATEGORIES
const categoryRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const categoryString = {
  'string.base': TYPE_STRING,
};

const categoryAllow = {
  'any.only': CATEGORY_NOT_CORRECT,
};

// TITLE
const titleRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const titleString = {
  'string.base': TYPE_STRING,
};

const titleNotEmpty = {
  'string.empty': TITLE_REQUIRED,
};

const titleMin = {
  'string.min': TITLE_MIN_LENGTH,
};

const titleMax = {
  'string.max': TITLE_MAX_LENGTH,
};

const titlePattern = {
  'string.pattern.base': TITLE_NOT_CORRECT,
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

const titleMessages = {
  ...titleRequired,
  ...titleString,
  ...titleNotEmpty,
  ...titleMin,
  ...titleMax,
  ...titlePattern,
};

const contentMessages = {
  ...contentRequired,
  ...contentString,
  ...contentMin,
  ...contentMax,
  ...contentNotEmpty,
};

const categoryMessages = {
  ...categoryRequired,
  ...categoryString,
  ...categoryAllow,
};

module.exports = {
  categoryRequired,
  categoryString,
  categoryAllow,
  categoryMessages,
  contentRequired,
  contentString,
  contentMin,
  contentMax,
  contentNotEmpty,
  contentMessages,
  titlePattern,
  titleRequired,
  titleString,
  titleNotEmpty,
  titleMin,
  titleMax,
  titleMessages,
};
