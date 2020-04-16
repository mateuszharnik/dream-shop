const idRequired = {
  prop: 'id',
  type: 'any.required',
  message: 'Id użytkownika jest wymagane',
  status: 400,
};

const idNotEmpty = {
  prop: 'id',
  type: 'string.empty',
  message: 'Id użytkownika nie może być puste',
  status: 400,
};

const idString = {
  prop: 'id',
  type: 'string.base',
  message: 'Id użytkownika musi być typu tekstowego',
  status: 400,
};

module.exports = {
  idRequired,
  idNotEmpty,
  idString,
};
