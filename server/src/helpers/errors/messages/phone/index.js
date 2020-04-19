const phoneRequired = {
  'any.required': 'Właściwość "phone" jest wymagana',
};

const phoneString = {
  'string.base': 'Właściwość "phone" musi być typu "string"',
};

const phonePattern = {
  'string.pattern.base': 'Numer telefonu jest nieprawidłowy',
};

const phoneMessages = {
  ...phoneRequired,
  ...phoneString,
  ...phonePattern,
};

module.exports = {
  phoneRequired,
  phoneString,
  phonePattern,
  phoneMessages,
};
