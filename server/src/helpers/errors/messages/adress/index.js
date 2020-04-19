// STREET
const streetRequired = {
  'any.required': 'Właściwość "street" jest wymagana',
};

const streetString = {
  'string.base': 'Właściwość "street" musi być typu "string"',
};

const streetNotEmpty = {
  'string.empty': 'Musisz podać nazwę ulicy',
};

const streetMin = {
  'string.min': 'Nazwa ulicy musi mieć minimum 2 znaki',
};

const streetMax = {
  'string.max': 'Nazwa ulicy może mieć maksymalnie 100 znaków',
};

// STREET NUMBER
const streetNumberRequired = {
  'any.required': 'Właściwość "street_number" jest wymagana',
};

const streetNumberString = {
  'string.base': 'Właściwość "street_number" musi być typu "string"',
};

const streetNumberNotEmpty = {
  'string.empty': 'Musisz podać numer ulicy/lokalu',
};

const streetNumberPattern = {
  'string.pattern.base': 'Numer ulicy/lokalu jest nieprawidłowy',
};

// CITY
const cityRequired = {
  'any.required': 'Właściwość "city" jest wymagana',
};

const cityString = {
  'string.base': 'Właściwość "city" musi być typu "string"',
};

const cityNotEmpty = {
  'string.empty': 'Musisz podać nazwę miasta',
};

const cityMin = {
  'string.min': 'Nazwa miasta musi mieć minimum 2 znaki',
};

const cityMax = {
  'string.max': 'Nazwa miasta może mieć maksymalnie 100 znaków',
};

// ZIP CODE
const zipCodeRequired = {
  'any.required': 'Właściwość "zip_code" jest wymagana',
};

const zipCodeString = {
  'string.base': 'Właściwość "zip_code" musi być typu "string"',
};

const zipCodeNotEmpty = {
  'string.empty': 'Musisz podać numer pocztowy',
};

const zipCodePattern = {
  'string.pattern.base': 'Numer pocztowy jest nieprawidłowy',
};

// ADRESS
const adressObject = {
  'object.base': 'Właściwość "adress" musi być typu "object"',
};

const adressObjectUnknow = {
  'object.unknown': 'Właściwość {#label} jest niedozwolona',
};

const adressRequired = {
  'any.required': 'Właściwość "adress" jest wymagana',
};

const adressMessages = {
  ...adressObject,
  ...adressRequired,
  ...adressObjectUnknow,
};

const streetMessages = {
  ...streetRequired,
  ...streetString,
  ...streetNotEmpty,
  ...streetMax,
  ...streetMin,
};

const streetNumberMessages = {
  ...streetNumberRequired,
  ...streetNumberString,
  ...streetNumberNotEmpty,
  ...streetNumberPattern,
};

const cityMessages = {
  ...cityRequired,
  ...cityString,
  ...cityNotEmpty,
  ...cityMax,
  ...cityMin,
};

const zipCodeMessages = {
  ...zipCodeRequired,
  ...zipCodeString,
  ...zipCodeNotEmpty,
  ...zipCodePattern,
};

module.exports = {
  adressObject,
  adressRequired,
  adressObjectUnknow,
  adressMessages,
  streetRequired,
  streetString,
  streetNotEmpty,
  streetMax,
  streetMin,
  streetMessages,
  streetNumberRequired,
  streetNumberString,
  streetNumberNotEmpty,
  streetNumberPattern,
  streetNumberMessages,
  cityRequired,
  cityString,
  cityNotEmpty,
  cityMax,
  cityMin,
  cityMessages,
  zipCodeRequired,
  zipCodeString,
  zipCodeNotEmpty,
  zipCodePattern,
  zipCodeMessages,
};
