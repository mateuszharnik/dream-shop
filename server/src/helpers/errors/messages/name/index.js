// NAME
const nameRequired = {
  'any.required': 'Właściwość "name" jest wymagana.',
};

const nameString = {
  'string.base': 'Właściwość "name" musi być typu "string".',
};

const namePattern = {
  'string.pattern.base': 'Imię jest nieprawidłowe.',
};

const nameNotEmpty = {
  'string.empty': 'Musisz podać imię.',
};

const nameMin = {
  'string.min': 'Imię musi mieć minimum 3 znaki.',
};

const nameMax = {
  'string.max': 'Imię może mieć maksymalnie 30 znaków.',
};

// SURNAME
const surnameRequired = {
  'any.required': 'Właściwość "surname" jest wymagana.',
};

const surnameString = {
  'string.base': 'Właściwość "surname" musi być typu "string".',
};

const surnamePattern = {
  'string.pattern.base': 'Nazwisko jest nieprawidłowe.',
};

const surnameNotEmpty = {
  'string.empty': 'Musisz podać nazwisko.',
};

const surnameMin = {
  'string.min': 'Nazwisko musi mieć minimum 3 znaki.',
};

const surnameMax = {
  'string.max': 'Nazwisko może mieć maksymalnie 30 znaków.',
};

const nameMessages = {
  ...nameRequired,
  ...nameString,
  ...namePattern,
  ...nameMax,
  ...nameMin,
  ...nameNotEmpty,
};

const surnameMessages = {
  ...surnameRequired,
  ...surnameString,
  ...surnamePattern,
  ...surnameMax,
  ...surnameMin,
  ...surnameNotEmpty,
};

module.exports = {
  nameRequired,
  nameString,
  namePattern,
  nameMax,
  nameNotEmpty,
  nameMin,
  nameMessages,
  surnameRequired,
  surnameString,
  surnamePattern,
  surnameMax,
  surnameNotEmpty,
  surnameMin,
  surnameMessages,
};
