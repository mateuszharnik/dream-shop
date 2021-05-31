const {
  categoryNotCorrectMessage,
  titleRequiredMessage,
  titleNotCorrectMessage,
  titleMinLengthMessage,
  titleMaxLengthMessage,
  contentRequiredMessage,
  contentMinLengthMessage,
  contentMaxLengthMessage,
} = require('../../../variables/faq');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// CATEGORIES
const categoryRequired = {
  'any.required': propertyRequiredMessage,
};

const categoryString = {
  'string.base': typeStringMessage,
};

const categoryAllow = {
  'any.only': categoryNotCorrectMessage,
};

// TITLE
const titleRequired = {
  'any.required': propertyRequiredMessage,
};

const titleString = {
  'string.base': typeStringMessage,
};

const titleNotEmpty = {
  'string.empty': titleRequiredMessage,
};

const titleMin = {
  'string.min': titleMinLengthMessage,
};

const titleMax = {
  'string.max': titleMaxLengthMessage,
};

const titlePattern = {
  'string.pattern.base': titleNotCorrectMessage,
};

// CONTENT
const contentRequired = {
  'any.required': propertyRequiredMessage,
};

const contentString = {
  'string.base': typeStringMessage,
};

const contentNotEmpty = {
  'string.empty': contentRequiredMessage,
};

const contentMin = {
  'string.min': contentMinLengthMessage,
};

const contentMax = {
  'string.max': contentMaxLengthMessage,
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
