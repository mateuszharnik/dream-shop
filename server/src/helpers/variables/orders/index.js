const ordersNotFoundMessage = 'Nie udało się pobrać zamówień.';
const orderNotFoundMessage = 'Zamówienie nie istnieje.';
const orderNotDeletedMessage = 'Nie udało się usunąć zamówienia.';
const orderNotAddedMessage = 'Nie udało się dodać zamówienia.';
const ordersNotDeletedMessage = 'Nie udało się usunąć zamówień.';
const ordersDeletedMessage = 'Usunięto wszystkie zamówienia';
const orderNotAcceptedMessage = 'Nie udało się oznaczyć zamówienia jako wysłane.';
const orderNotRefusedMessage = 'Nie udało się oznaczyć zamówienia jako anulowane.';
const orderNotPaidMessage = 'Nie udało się opłacić zamówienia.';

const orderProductsMinLength = 1;

const exampleContact = {
  name: 'Jan',
  surname: 'Kowalski',
  email: 'example@domain.com',
  phone: '123 123 123',
  street: 'Street',
  street_number: '1/1',
  city: 'City',
  zip_code: '00-000',
};

const seedOrdersLimit = 20;

module.exports = {
  seedOrdersLimit,
  exampleContact,
  ordersNotFoundMessage,
  orderNotDeletedMessage,
  orderNotFoundMessage,
  ordersNotDeletedMessage,
  ordersDeletedMessage,
  orderNotAcceptedMessage,
  orderNotRefusedMessage,
  orderNotPaidMessage,
  orderNotAddedMessage,
  orderProductsMinLength,
};
