// SUBJECT
const subjectRequired = {
  'any.required': 'Właściwość "subject" jest wymagana',
};

const subjectString = {
  'string.base': 'Właściwość "subject" musi być typu "string"',
};

const subjectNotEmpty = {
  'string.empty': 'Musisz podać temat',
};

const subjectMin = {
  'string.min': 'Temat musi mieć minimum 3 znaki',
};

const subjectMax = {
  'string.max': 'Temat może mieć maksymalnie 150 znaków',
};

// MESSAGE
const messageRequired = {
  'any.required': 'Właściwość "message" jest wymagana',
};

const messageString = {
  'string.base': 'Właściwość "message" musi być typu "string"',
};

const messageNotEmpty = {
  'string.empty': 'Musisz podać treść wiadomości',
};

const messageMin = {
  'string.min': 'Treść wiadomości musi mieć minimum 3 znaki',
};

const messageMax = {
  'string.max': 'Treść wiadomości może mieć maksymalnie 2000 znaków',
};

// TERMS
const termsRequired = {
  'any.required': 'Właściwość "terms_accepted" jest wymagana',
};

const termsOnly = {
  'any.only': 'Musisz zaakceptować regulamin',
};

const termsBoolean = {
  'boolean.base': 'Właściwość "terms_accepted" musi być typu "boolean"',
};

const termsMessages = {
  ...termsRequired,
  ...termsBoolean,
  ...termsOnly,
};

const subjectMessages = {
  ...subjectRequired,
  ...subjectString,
  ...subjectNotEmpty,
  ...subjectMin,
  ...subjectMax,
};

const messageMessages = {
  ...messageRequired,
  ...messageString,
  ...messageNotEmpty,
  ...messageMin,
  ...messageMax,
};

module.exports = {
  subjectRequired,
  subjectString,
  subjectNotEmpty,
  subjectMin,
  subjectMax,
  subjectMessages,
  messageRequired,
  messageString,
  messageNotEmpty,
  messageMin,
  messageMax,
  messageMessages,
  termsRequired,
  termsOnly,
  termsBoolean,
  termsMessages,
};
