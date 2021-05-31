const { FIVE_MINUTES, FIFTEEN_MINUTES } = require('../../constants/time');

const recoveryLimiterMessage = 'Przekroczono limit. Spróbuj wysłać wiadomość ponownie później.';
const loginLimiterMessage = 'Przekroczono limit. Spróbuj zalogować się ponownie później.';
const newsletterLimiterMessage = 'Przekroczono limit. Spróbuj zapisać się ponownie później.';
const messagesLimiterMessage = 'Przekroczono limit. Spróbuj wysłać wiadomość ponownie później.';
const commentsLimiterMessage = 'Przekroczono limit. Spróbuj dodać komentarz ponownie później.';

const recoveryLimiterLength = 10;
const loginLimiterLength = 10;
const newsletterLimiterLength = 3;
const messagesLimiterLength = 3;
const commentsLimiterLength = 10;

const recoveryLimiterTime = FIFTEEN_MINUTES;
const loginLimiterTime = FIFTEEN_MINUTES;
const newsletterLimiterTime = FIVE_MINUTES;
const messagesLimiterTime = FIVE_MINUTES;
const commentsLimiterTime = FIVE_MINUTES;

module.exports = {
  recoveryLimiterMessage,
  loginLimiterMessage,
  newsletterLimiterMessage,
  messagesLimiterMessage,
  commentsLimiterMessage,
  recoveryLimiterLength,
  loginLimiterLength,
  newsletterLimiterLength,
  messagesLimiterLength,
  commentsLimiterLength,
  recoveryLimiterTime,
  loginLimiterTime,
  newsletterLimiterTime,
  messagesLimiterTime,
  commentsLimiterTime,
};
