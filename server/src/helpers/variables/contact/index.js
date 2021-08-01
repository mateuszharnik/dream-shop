const contactNotFoundMessage = 'Informacje kontaktowe nie istnieją.';
const contactNotUpdatedMessage = 'Nie udało się zaktualizować informacji kontaktowych.';

const streetNameRequiredMessage = 'Musisz podać nazwę ulicy.';
const streetNameMinLengthMessage = 'Nazwa ulicy musi mieć minimum 3 znaki.';
const streetNameMaxLengthMessage = 'Nazwa ulicy może mieć maksymalnie 100 znaków.';

const streetMinLength = 3;
const streetMaxLength = 100;

const streetNumberRequiredMessage = 'Musisz podać numer ulicy/lokalu.';
const streetNumberNotCorrectMessage = 'Numer ulicy/lokalu jest nieprawidłowy.';

const cityNameRequiredMessage = 'Musisz podać nazwę miasta.';
const cityNameMinLengthMessage = 'Nazwa miasta musi mieć minimum 3 znaki.';
const cityNameMaxLengthMessage = 'Nazwa miasta może mieć maksymalnie 100 znaków.';

const cityMinLength = 3;
const cityMaxLength = 100;

const zipCodeRequiredMessage = 'Musisz podać numer pocztowy.';
const zipCodeNotCorrectMessage = 'Numer pocztowy jest nieprawidłowy.';

const hoursNotCorrectMessage = 'Godziny pracy są nieprawidłowe.';

const nipNotCorrectMessage = 'Numer NIP jest nieprawidłowy.';

const phoneNotCorrectMessage = 'Numer telefonu jest nieprawidłowy.';

const exampleContact = {
  email: 'example@domain.com',
  phone: '123 123 123',
  nip: '1234567890',
  street: 'Street',
  street_number: '1/1',
  city: 'City',
  zip_code: '00-000',
  working_hours: '07:00 - 17:00',
};

const contact = {
  email: '',
  phone: '',
  nip: '',
  street: '',
  street_number: '',
  city: '',
  zip_code: '',
  working_hours: '',
};

module.exports = {
  contact,
  exampleContact,
  contactNotFoundMessage,
  contactNotUpdatedMessage,
  streetNameRequiredMessage,
  streetNameMinLengthMessage,
  streetNameMaxLengthMessage,
  streetMinLength,
  streetMaxLength,
  streetNumberRequiredMessage,
  streetNumberNotCorrectMessage,
  cityNameRequiredMessage,
  cityNameMinLengthMessage,
  cityNameMaxLengthMessage,
  cityMinLength,
  cityMaxLength,
  zipCodeRequiredMessage,
  zipCodeNotCorrectMessage,
  hoursNotCorrectMessage,
  nipNotCorrectMessage,
  phoneNotCorrectMessage,
};
