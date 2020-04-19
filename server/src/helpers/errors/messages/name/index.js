const nameRequired = {
  'any.required': 'Właściwość "name" jest wymagana',
};

const nameString = {
  'string.base': 'Właściwość "name" musi być typu "string"',
};

const namePattern = {
  'string.pattern.base': 'Imię jest nieprawidłowe',
};

const nameMin = {
  'string.min': 'Imię musi mieć minimum 3 znaki',
};

const nameMax = {
  'string.max': 'Imię może mieć maksymalnie 30 znaków',
};

const nameMessages = {
  ...nameRequired,
  ...nameString,
  ...namePattern,
  ...nameMax,
  ...nameMin,
};

module.exports = {
  nameRequired,
  nameString,
  namePattern,
  nameMax,
  nameMin,
  nameMessages,
};
