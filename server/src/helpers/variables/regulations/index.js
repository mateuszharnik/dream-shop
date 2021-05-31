const regulationsNotFoundMessage = 'Regulaminy nie istnieją.';
const regulationNotFoundMessage = 'Regulamin nie istnieje.';
const regulationNotUpdatedMessage = 'Nie udało się zaktualizować regulaminu.';
const regulationNameIsNotAllowedMessage = 'Nazwa regulaminu jest niedozwolona.';

const regulationNameRequiredMessage = 'Musisz podać nazwę regulaminu.';
const regulationNameMinLengthMessage = 'Nazwa regulaminu musi mieć minimum 3 znaki.';
const regulationNameMaxLengthMessage = 'Nazwa regulaminu może mieć maksymalnie 300 znaków.';

const regulationNameMinLength = 3;
const regulationNameMaxLength = 300;

const contentRequiredMessage = 'Musisz podać treść regulaminu.';
const contentMinLengthMessage = 'Regulamin musi mieć minimum 3 znaki.';
const contentMaxLengthMessage = 'Regulamin może mieć maksymalnie 50000 znaków.';

const contentMinLength = 3;
const contentMaxLength = 50000;

const defaultNewsletterRegulationsName = 'newsletter';
const defaultNewsletterRegulationsContent = 'Regulamin Newslettera.';

const defaultContactRegulationsName = 'kontakt';
const defaultContactRegulationsContent = 'Regulamin Formularza.';

module.exports = {
  regulationsNotFoundMessage,
  regulationNotFoundMessage,
  regulationNotUpdatedMessage,
  regulationNameIsNotAllowedMessage,
  regulationNameRequiredMessage,
  regulationNameMinLengthMessage,
  regulationNameMaxLengthMessage,
  regulationNameMinLength,
  regulationNameMaxLength,
  contentRequiredMessage,
  contentMinLengthMessage,
  contentMaxLengthMessage,
  contentMinLength,
  contentMaxLength,
  defaultNewsletterRegulationsName,
  defaultNewsletterRegulationsContent,
  defaultContactRegulationsName,
  defaultContactRegulationsContent,
};
