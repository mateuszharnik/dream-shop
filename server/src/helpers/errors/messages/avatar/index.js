const { pathToFileNotCorrectMessage } = require('../../../variables/files');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// AVATAR
const avatarRequired = {
  'any.required': propertyRequiredMessage,
};

const avatarString = {
  'string.base': typeStringMessage,
};

const avatarPattern = {
  'string.pattern.base': pathToFileNotCorrectMessage,
};

const avatarMessages = {
  ...avatarString,
  ...avatarRequired,
  ...avatarPattern,
};

module.exports = {
  avatarString,
  avatarRequired,
  avatarPattern,
  avatarMessages,
};
