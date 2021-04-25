const USER_NOT_FOUND = 'Użytkownik nie istnieje.';
const USER_NOT_UPDATED = 'Nie udało się zaktualizować profilu użytkownika.';
const USERNAME_ALREADY_EXIST = 'Nazwa użytkownika jest już zajęta.';
const EMAIL_ALREADY_EXIST = 'Email jest już zajęty.';
const PASSWORDS_ARE_NOT_THE_SAME = 'Błędne hasło.';
const PASSWORD_OR_USERNAME_NOT_CORRECT = 'Błędne hasło lub nazwa użytkownika.';

const NAME_REQUIRED = 'Musisz podać imię.';
const NAME_NOT_CORRECT = 'Imię jest nieprawidłowe.';
const NAME_MIN_LENGTH = 'Imię musi mieć minimum 3 znaki.';
const NAME_MAX_LENGTH = 'Imię może mieć maksymalnie 50 znaków.';

const SURNAME_REQUIRED = 'Musisz podać nazwisko.';
const SURNAME_NOT_CORRECT = 'Nazwisko jest nieprawidłowe.';
const SURNAME_MIN_LENGTH = 'Nazwisko musi mieć minimum 3 znaki.';
const SURNAME_MAX_LENGTH = 'Nazwisko może mieć maksymalnie 50 znaków.';

const USERNAME_REQUIRED = 'Musisz podać nazwę użytkownika.';
const USERNAME_MIN_LENGTH = 'Nazwa użytkownika musi mieć minimum 3 znaki.';
const USERNAME_MAX_LENGTH = 'Nazwa użytkownika może mieć maksymalnie 50 znaków.';
const USERNAME_ALPHANUM = 'Nazwa użytkownika może zawierać tylko cyfry i litery.';

const ROLES_REQUIRED = 'Właściwość {#label} nie posiada wymaganych elementów.';
const ROLES_NOT_ALLOWED = 'Właściwość {#label} zawiera elementy będące niedozwolonymi typami.';

const PASSWORD_REQUIRED = 'Musisz podać hasło.';
const PASSWORD_MIN_LENGTH = 'Hasło musi mieć minimum 8 znaków.';
const PASSWORD_MAX_LENGTH = 'Hasło może mieć maksymalnie 32 znaki.';

const NEW_PASSWORD_REQUIRED = 'Musisz podać nowe hasło.';
const NEW_PASSWORD_MIN_LENGTH = 'Nowe hasło musi mieć minimum 8 znaków.';
const NEW_PASSWORD_MAX_LENGTH = 'Nowe hasło może mieć maksymalnie 32 znaki.';

const PASSWORDS_NOT_MATCH = 'Hasła nie są takie same.';

const ADMIN = 'administrator';
const USER = 'user';

const DEFAULT_USERNAME = 'administrator';

module.exports = {
  USER_NOT_FOUND,
  USER_NOT_UPDATED,
  USERNAME_ALREADY_EXIST,
  EMAIL_ALREADY_EXIST,
  PASSWORDS_ARE_NOT_THE_SAME,
  PASSWORD_OR_USERNAME_NOT_CORRECT,
  NAME_REQUIRED,
  NAME_NOT_CORRECT,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  SURNAME_REQUIRED,
  SURNAME_NOT_CORRECT,
  SURNAME_MIN_LENGTH,
  SURNAME_MAX_LENGTH,
  USERNAME_REQUIRED,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_ALPHANUM,
  ROLES_REQUIRED,
  ROLES_NOT_ALLOWED,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_MIN_LENGTH,
  NEW_PASSWORD_MAX_LENGTH,
  PASSWORDS_NOT_MATCH,
  ADMIN,
  USER,
  DEFAULT_USERNAME,
};
