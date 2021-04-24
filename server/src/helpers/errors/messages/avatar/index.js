const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const { PATH_TO_FILE_NOT_CORRECT } = require('../../../constants/files');

// AVATAR
const avatarRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const avatarString = {
  'string.base': TYPE_STRING,
};

const avatarPattern = {
  'string.pattern.base': PATH_TO_FILE_NOT_CORRECT,
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
