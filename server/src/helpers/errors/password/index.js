const passwordRequired = {
  prop: 'password',
  type: 'any.required',
  message: 'Hasło jest wymagane',
  status: 400,
};

const passwordNotEmpty = {
  prop: 'password',
  type: 'string.empty',
  message: 'Hasło nie może być puste',
  status: 400,
};

const passwordString = {
  prop: 'password',
  type: 'string.base',
  message: 'Hasło musi być typu tekstowego',
  status: 400,
};

const passwordMin = {
  prop: 'password',
  type: 'string.min',
  message: 'Hasło musi mieć minimum 8 znaków',
  status: 400,
};

const passwordMax = {
  prop: 'password',
  type: 'string.max',
  message: 'Hasło może mieć maksymalnie 32 znaki',
  status: 400,
};

const confirmPasswordRequired = {
  prop: 'confirmPassword',
  type: 'any.required',
  message: 'Musisz powtórzyć nowe hasło',
  status: 400,
};

const confirmPasswordNotMatch = {
  prop: 'confirmPassword',
  type: 'any.only',
  message: 'Hasła nie są takie same',
  status: 400,
};

module.exports = {
  passwordRequired,
  passwordNotEmpty,
  passwordString,
  passwordMin,
  passwordMax,
  confirmPasswordRequired,
  confirmPasswordNotMatch,
};
