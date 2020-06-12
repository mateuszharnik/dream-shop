// TERMS
const termsRequired = {
  'any.required': 'Właściwość "terms_accepted" jest wymagana.',
};

const termsOnly = {
  'any.only': 'Musisz zaakceptować regulamin.',
};

const termsBoolean = {
  'boolean.base': 'Właściwość "terms_accepted" musi być typu "boolean".',
};

const termsMessages = {
  ...termsRequired,
  ...termsBoolean,
  ...termsOnly,
};

module.exports = {
  termsRequired,
  termsOnly,
  termsBoolean,
  termsMessages,
};
