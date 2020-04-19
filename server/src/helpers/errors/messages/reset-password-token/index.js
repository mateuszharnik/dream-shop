// RESET PASSWORD TOKEN
const resetPasswordTokenRequired = {
  'any.required': 'Właściwość "reset_password_token" jest wymagana',
};

const resetPasswordTokenString = {
  'string.base': 'Właściwość "reset_password_token" musi być typu "string"',
};

const resetPasswordTokenNotEmpty = {
  'string.empty': 'Właściwość "reset_password_token" nie może być pusta',
};

// RESET PASSWORD TOKEN EXP
const resetPasswordTokenExpRequired = {
  'any.required': 'Właściwość "reset_password_token_exp" jest wymagana',
};

const resetPasswordTokenExpNumber = {
  'number.base': 'Właściwość "reset_password_token_exp" musi być typu "number"',
};

const resetPasswordTokenMessages = {
  ...resetPasswordTokenRequired,
  ...resetPasswordTokenString,
  ...resetPasswordTokenNotEmpty,
};

const resetPasswordTokenExpMessages = {
  ...resetPasswordTokenExpRequired,
  ...resetPasswordTokenExpNumber,
};

module.exports = {
  resetPasswordTokenRequired,
  resetPasswordTokenString,
  resetPasswordTokenNotEmpty,
  resetPasswordTokenExpRequired,
  resetPasswordTokenExpNumber,
  resetPasswordTokenMessages,
  resetPasswordTokenExpMessages,
};
