const nipRequired = {
  'any.required': 'Właściwość "nip" jest wymagana',
};

const nipString = {
  'string.base': 'Właściwość "nip" musi być typu "string"',
};

const nipPattern = {
  'string.pattern.base': 'Numer NIP jest nieprawidłowy',
};

const nipMessages = {
  ...nipRequired,
  ...nipString,
  ...nipPattern,
};

module.exports = {
  nipRequired,
  nipString,
  nipPattern,
  nipMessages,
};
