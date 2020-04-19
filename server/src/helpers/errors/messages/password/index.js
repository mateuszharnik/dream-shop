// PASSWORD
const passwordRequired = {
  'any.required': 'Właściwość "password" jest wymagana',
};

const passwordNotEmpty = {
  'string.empty': 'Musisz podać hasło',
};

const passwordString = {
  'string.base': 'Właściwość "password" musi być typu "string"',
};

const passwordMin = {
  'string.min': 'Hasło musi mieć minimum 8 znaki',
};

const passwordMax = {
  'string.max': 'Hasło może mieć maksymalnie 32 znaków',
};

// CONFIRM PASSWORD
const confirmPasswordRequired = {
  'any.required': 'Właściwość "confirmPassword" jest wymagana',
};

const confirmPasswordNotMatch = {
  'any.only': 'Hasła nie są takie same',
};

const passwordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
  ...passwordMin,
  ...passwordMax,
};

const confirmPasswordMessages = {
  ...confirmPasswordRequired,
  ...confirmPasswordNotMatch,
};

module.exports = {
  passwordRequired,
  passwordNotEmpty,
  passwordString,
  passwordMin,
  passwordMax,
  confirmPasswordRequired,
  confirmPasswordNotMatch,
  passwordMessages,
  confirmPasswordMessages,
};
