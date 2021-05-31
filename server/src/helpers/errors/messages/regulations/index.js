const {
  regulationNameRequiredMessage,
  regulationNameMinLengthMessage,
  regulationNameMaxLengthMessage,
  contentRequiredMessage,
  contentMinLengthMessage,
  contentMaxLengthMessage,
} = require('../../../variables/regulations');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// NAME
const nameRequired = {
  'any.required': propertyRequiredMessage,
};

const nameString = {
  'string.base': typeStringMessage,
};

const nameNotEmpty = {
  'string.empty': regulationNameRequiredMessage,
};

const nameMin = {
  'string.min': regulationNameMinLengthMessage,
};

const nameMax = {
  'string.max': regulationNameMaxLengthMessage,
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
