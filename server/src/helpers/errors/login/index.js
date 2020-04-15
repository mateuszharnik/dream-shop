const loginErrors = [
  {
    prop: 'username',
    type: 'any.required',
    message: 'Nazwa użytkownika jest wymagana',
    status: 400,
  },
  {
    prop: 'username',
    type: 'string.empty',
    message: 'Nazwa użytkownika nie może być pusta',
    status: 400,
  },
  {
    prop: 'username',
    type: 'string.base',
    message: 'Nazwa użytkownika musi być typu tekstowego',
    status: 400,
  },
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
];

module.exports = { loginErrors };
