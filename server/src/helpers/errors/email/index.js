const emailErrors = [
  {
    prop: 'email',
    type: 'any.required',
    message: 'Email jest wymagany',
    status: 400,
  },
  {
    prop: 'email',
    type: 'string.empty',
    message: 'Email nie może być pusty',
    status: 400,
  },
  {
    prop: 'email',
    type: 'string.base',
    message: 'Email musi być typu tekstowego',
    status: 400,
  },
  {
    prop: 'email',
    type: 'string.pattern.base',
    message: 'Email jest niepoprawny',
    status: 400,
  },
];

module.exports = { emailErrors };
