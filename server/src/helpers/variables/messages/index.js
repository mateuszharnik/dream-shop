const messageNotFoundMessage = 'Wiadomość nie istnieje.';
const messagesNotFoundMessage = 'W bazie danych nie ma żadnych wiadomości.';
const messagesNotDeletedMessage = 'Nie udało się usunąć wiadomości.';
const messageNotDeletedMessage = 'Nie udało się usunąć wiadomości.';
const messagesDeletedMessage = 'Usunięto wszystkie wiadomości.';
const messageNotCreatedMessage = 'Nie udało się wysłać wiadomości.';
const messageNotUpdatedMessage = 'Nie udało się zaktualizować wiadomości.';

const subjectRequiredMessage = 'Musisz podać temat.';
const subjectMinLengthMessage = 'Temat musi mieć minimum 3 znaki.';
const subjectMaxLengthMessage = 'Temat może mieć maksymalnie 300 znaków.';

const subjectMinLength = 3;
const subjectMaxLength = 300;

const messageRequiredMessage = 'Musisz podać treść wiadomości.';
const messageMinLengthMessage = 'Treść wiadomości musi mieć minimum 3 znaki.';
const messageMaxLengthMessage = 'Treść wiadomości może mieć maksymalnie 5000 znaków.';

const messageMinLength = 3;
const messageMaxLength = 5000;

const termsRequiredMessage = 'Musisz zaakceptować regulamin.';

module.exports = {
  messageNotFoundMessage,
  messagesNotFoundMessage,
  messagesNotDeletedMessage,
  messageNotDeletedMessage,
  messagesDeletedMessage,
  messageNotCreatedMessage,
  messageNotUpdatedMessage,
  subjectRequiredMessage,
  subjectMinLengthMessage,
  subjectMaxLengthMessage,
  subjectMinLength,
  subjectMaxLength,
  messageRequiredMessage,
  messageMinLengthMessage,
  messageMaxLengthMessage,
  messageMinLength,
  messageMaxLength,
  termsRequiredMessage,
};
