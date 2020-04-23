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
  'string.min': 'Hasło musi mieć minimum 8 znaków',
};

const passwordMax = {
  'string.max': 'Hasło może mieć maksymalnie 32 znaki',
};

// NEW PASSWORD
const newPasswordRequired = {
  'any.required': 'Właściwość "new_password" jest wymagana',
};

const newPasswordNotEmpty = {
  'string.empty': 'Musisz podać nowe hasło',
};

const newPasswordString = {
  'string.base': 'Właściwość "new_password" musi być typu "string"',
};

const newPasswordMin = {
  'string.min': 'Nowe hasło musi mieć minimum 8 znaków',
};

const newPasswordMax = {
  'string.max': 'Nowe hasło może mieć maksymalnie 32 znaki',
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

const newPasswordMessages = {
  ...newPasswordRequired,
  ...newPasswordNotEmpty,
  ...newPasswordString,
  ...newPasswordMin,
  ...newPasswordMax,
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
  newPasswordRequired,
  newPasswordNotEmpty,
  newPasswordString,
  newPasswordMin,
  newPasswordMax,
  newPasswordMessages,
};
