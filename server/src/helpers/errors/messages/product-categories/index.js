// CATEGORY NAME
const productCategoryNameRequired = {
  'any.required': 'Właściwość "name" jest wymagana',
};

const productCategoryNameString = {
  'string.base': 'Właściwość "name" musi być typu "string"',
};

const productCategoryNamePattern = {
  'string.pattern.base': 'Nazwa kategorii jest nieprawidłowa',
};

const productCategoryNameNotEmpty = {
  'string.empty': 'Musisz podać nazwę kategorii',
};

// CATEGORY
const productCategoryRequired = {
  'any.required': 'Właściwość "category" jest wymagana',
};

const productCategoryInvalid = {
  'any.invalid': 'Nie możesz utworzyć takiej kategorii',
};

const productCategoryString = {
  'string.base': 'Właściwość "category" musi być typu "string"',
};

const productCategoryPattern = {
  'string.pattern.base': 'Kategoria może zawierać tylko znaki alfabetu angielskiego rozdzielone znakiem "-"',
};

const productCategoryNotEmpty = {
  'string.empty': 'Musisz podać kategorię',
};

const productCategoryNameMessages = {
  ...productCategoryNameRequired,
  ...productCategoryNameNotEmpty,
  ...productCategoryNameString,
  ...productCategoryNamePattern,
};

const productCategoryMessages = {
  ...productCategoryRequired,
  ...productCategoryNotEmpty,
  ...productCategoryString,
  ...productCategoryPattern,
  ...productCategoryInvalid,
};

module.exports = {
  productCategoryNameRequired,
  productCategoryNameNotEmpty,
  productCategoryNameString,
  productCategoryNamePattern,
  productCategoryNameMessages,
  productCategoryInvalid,
  productCategoryRequired,
  productCategoryNotEmpty,
  productCategoryString,
  productCategoryPattern,
  productCategoryMessages,
};
