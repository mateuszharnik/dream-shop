const usernameRequired = {
  'any.required': 'Właściwość "username" jest wymagana.',
};

const usernameNotEmpty = {
  'string.empty': 'Musisz podać nazwę użytkownika.',
};

const usernameString = {
  'string.base': 'Właściwość "username" musi być typu "string".',
};

const usernameMin = {
  'string.min': 'Nazwa użytkownika musi mieć minimum 3 znaki.',
};

const usernameMax = {
  'string.max': 'Nazwa użytkownika może mieć maksymalnie 30 znaków.',
};

const usernameAlphanum = {
  'string.alphanum': 'Nazwa użytkownika może zawierać tylko cyfry i litery.',
};

const usernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
  ...usernameAlphanum,
  ...usernameMax,
  ...usernameMin,
};

module.exports = {
  usernameRequired,
  usernameNotEmpty,
  usernameString,
  usernameAlphanum,
  usernameMax,
  usernameMin,
  usernameMessages,
};
