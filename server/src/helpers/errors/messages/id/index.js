// DATABASE ID
const idRequired = {
  'any.required': 'Właściwość "_id" jest wymagana.',
};

const idString = {
  'string.base': 'Właściwość "_id" musi być typu "string".',
};

const idNotEmpty = {
  'string.empty': 'Właściwość "_id" nie może być pusta.',
};

const idPattern = {
  'string.pattern.base': 'Id jest nieprawidłowe.',
};

// RESET PASSWORD TOKEN ID
const resetPasswordIdRequired = {
  'any.required': 'Właściwość "id" jest wymagana.',
};

const resetPasswordIdString = {
  'string.base': 'Właściwość "id" musi być typu "string".',
};

const resetPasswordIdNotEmpty = {
  'string.empty': 'Właściwość "id" nie może być pusta.',
};

const idMessages = {
  ...idRequired,
  ...idString,
  ...idNotEmpty,
  ...idPattern,
};

const resetPasswordIdMessages = {
  ...resetPasswordIdRequired,
  ...resetPasswordIdString,
  ...resetPasswordIdNotEmpty,
};

module.exports = {
  idRequired,
  idString,
  idNotEmpty,
  idPattern,
  resetPasswordIdRequired,
  resetPasswordIdString,
  resetPasswordIdNotEmpty,
  idMessages,
  resetPasswordIdMessages,
};
