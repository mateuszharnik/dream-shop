const linkExpiredMessage = 'Link wygasł.';
const emailNotExistMessage = 'Podany email nie znajduje się w bazie danych.';
const messageSendSuccessMessage = 'Wiadomość została pomyślnie wysłana.';
const tokenNotGeneratedMessage = 'Nie udało się wygenerować tokenu.';

const resetPasswordTokeRequiredMessage = 'Właściwość "reset_password_token" nie może być pusta.';

const tokenTime = '1d';
const tokenLength = 12;

module.exports = {
  linkExpiredMessage,
  emailNotExistMessage,
  messageSendSuccessMessage,
  tokenNotGeneratedMessage,
  resetPasswordTokeRequiredMessage,
  tokenTime,
  tokenLength,
};
