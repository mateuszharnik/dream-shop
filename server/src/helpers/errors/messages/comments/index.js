const {
  contentRequiredMessage,
  contentMinLengthMessage,
  contentMaxLengthMessage,
  contentNotCorrectMessage,
} = require('../../../variables/comments');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// CONTENT
const contentRequired = {
  'any.required': propertyRequiredMessage,
};

const contentString = {
  'string.base': typeStringMessage,
};

const contentPattern = {
  'string.pattern.base': contentNotCorrectMessage,
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
