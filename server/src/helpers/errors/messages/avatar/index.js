const avatarRequired = {
  'any.required': 'Właściwość "avatar" jest wymagana.',
};

const avatarString = {
  'string.base': 'Właściwość "avatar" musi być typu "string".',
};

const avatarPattern = {
  'string.pattern.base': 'Ścieżka do pliku jest nieprawidłowa.',
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
