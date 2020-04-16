const usernameRequired = {
  prop: 'username',
  type: 'any.required',
  message: 'Nazwa użytkownika jest wymagana',
  status: 400,
};

const usernameNotEmpty = {
  prop: 'username',
  type: 'string.empty',
  message: 'Nazwa użytkownika nie może być pusta',
  status: 400,
};

const usernameString = {
  prop: 'username',
  type: 'string.base',
  message: 'Nazwa użytkownika musi być typu tekstowego',
  status: 400,
};

module.exports = {
  usernameRequired,
  usernameNotEmpty,
  usernameString,
};
