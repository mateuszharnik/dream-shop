const userNotFoundMessage = 'Użytkownik nie istnieje.';
const userNotUpdatedMessage = 'Nie udało się zaktualizować profilu użytkownika.';
const usernameAlreadyExistMessage = 'Nazwa użytkownika jest już zajęta.';
const emailAlreadyExistMessage = 'Email jest już zajęty.';
const passwordsAreNotTheSameMessage = 'Błędne hasło.';
const passwordOrUsernameNotCorrectMessage = 'Błędne hasło lub nazwa użytkownika.';

const nameRequiredMessage = 'Musisz podać imię.';
const nameNotCorrectMessage = 'Imię jest nieprawidłowe.';
const nameMinLengthMessage = 'Imię musi mieć minimum 3 znaki.';
const nameMaxLengthMessage = 'Imię może mieć maksymalnie 50 znaków.';

const nameMinLength = 3;
const nameMaxLength = 50;

const surnameRequiredMessage = 'Musisz podać nazwisko.';
const surnameNotCorrectMessage = 'Nazwisko jest nieprawidłowe.';
const surnameMinLengthMessage = 'Nazwisko musi mieć minimum 3 znaki.';
const surnameMaxLengthMessage = 'Nazwisko może mieć maksymalnie 50 znaków.';

const surnameMinLength = 3;
const surnameMaxLength = 50;

const usernameRequiredMessage = 'Musisz podać nazwę użytkownika.';
const usernameMinLengthMessage = 'Nazwa użytkownika musi mieć minimum 3 znaki.';
const usernameMaxLengthMessage = 'Nazwa użytkownika może mieć maksymalnie 50 znaków.';
const usernameAlphanumMessage = 'Nazwa użytkownika może zawierać tylko cyfry i litery.';

const usernameMinLength = 3;
const usernameMaxLength = 50;

const rolesRequiredMessage = 'Właściwość {#label} nie posiada wymaganych elementów.';
const rolesNotAllowedMessage = 'Właściwość {#label} zawiera elementy będące niedozwolonymi typami.';

const passwordRequiredMessage = 'Musisz podać hasło.';
const passwordMinLengthMessage = 'Hasło musi mieć minimum 8 znaków.';
const passwordMaxLengthMessage = 'Hasło może mieć maksymalnie 32 znaki.';

const passwordMinLength = 8;
const passwordMaxLength = 32;

const newPasswordRequiredMessage = 'Musisz podać nowe hasło.';
const newPasswordMinLengthMessage = 'Nowe hasło musi mieć minimum 8 znaków.';
const newPasswordMaxLengthMessage = 'Nowe hasło może mieć maksymalnie 32 znaki.';

const newPasswordMinLength = 8;
const newPasswordMaxLength = 32;

const passwordsNotMatchMessage = 'Hasła nie są takie same.';

const defaultUsername = 'administrator';

module.exports = {
  userNotFoundMessage,
  userNotUpdatedMessage,
  usernameAlreadyExistMessage,
  emailAlreadyExistMessage,
  passwordsAreNotTheSameMessage,
  passwordOrUsernameNotCorrectMessage,
  nameRequiredMessage,
  nameNotCorrectMessage,
  nameMinLengthMessage,
  nameMaxLengthMessage,
  nameMinLength,
  nameMaxLength,
  surnameRequiredMessage,
  surnameNotCorrectMessage,
  surnameMinLengthMessage,
  surnameMaxLengthMessage,
  surnameMinLength,
  surnameMaxLength,
  usernameRequiredMessage,
  usernameMinLengthMessage,
  usernameMaxLengthMessage,
  usernameAlphanumMessage,
  usernameMinLength,
  usernameMaxLength,
  rolesRequiredMessage,
  rolesNotAllowedMessage,
  passwordRequiredMessage,
  passwordMinLengthMessage,
  passwordMaxLengthMessage,
  passwordMinLength,
  passwordMaxLength,
  newPasswordRequiredMessage,
  newPasswordMinLengthMessage,
  newPasswordMaxLengthMessage,
  newPasswordMinLength,
  newPasswordMaxLength,
  passwordsNotMatchMessage,
  defaultUsername,
};
