const passwordsErrors = [
  {
    prop: 'password',
    type: 'any.required',
    message: 'Hasło jest wymagane',
    status: 400,
  },
  {
    prop: 'password',
    type: 'string.empty',
    message: 'Hasło nie może być puste',
    status: 400,
  },
  {
    prop: 'password',
    type: 'string.base',
    message: 'Hasło musi być typu tekstowego',
    status: 400,
  },
  {
    prop: 'password',
    type: 'string.min',
    message: 'Hasło musi mieć minimum 8 znaków',
    status: 400,
  },
  {
    prop: 'password',
    type: 'string.max',
    message: 'Hasło może mieć maksymalnie 32 znaki',
    status: 400,
  },
  {
    prop: 'confirmPassword',
    type: 'any.required',
    message: 'Musisz powtórzyć nowe hasło',
    status: 400,
  },
  {
    prop: 'confirmPassword',
    type: 'any.only',
    message: 'Hasła nie są takie same',
    status: 400,
  },
];

module.exports = { passwordsErrors };
