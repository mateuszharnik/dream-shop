const idErrors = [
  {
    prop: 'id',
    type: 'any.required',
    message: 'Id użytkownika jest wymagane',
    status: 400,
  },
  {
    prop: 'id',
    type: 'string.empty',
    message: 'Id użytkownika nie może być puste',
    status: 400,
  },
  {
    prop: 'id',
    type: 'string.base',
    message: 'Id użytkownika musi być typu tekstowego',
    status: 400,
  },
];

module.exports = { idErrors };
