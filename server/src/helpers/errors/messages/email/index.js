const emailRequired = {
  'any.required': 'Właściwość "email" jest wymagana',
};

const emailNotEmpty = {
  'string.empty': 'Musisz podać email',
};

const emailString = {
  'string.base': 'Właściwość "email" musi być typu "string"',
};

const emailPattern = {
  'string.pattern.base': 'Email jest nieprawidłowy',
};

const emailMessages = {
  ...emailRequired,
  ...emailNotEmpty,
  ...emailString,
  ...emailPattern,
};

module.exports = {
  emailRequired,
  emailNotEmpty,
  emailString,
  emailPattern,
  emailMessages,
};
