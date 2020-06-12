// NAME
const productNameRequired = {
  'any.required': 'Właściwość "name" jest wymagana.',
};

const productNamePattern = {
  'string.pattern.base': 'Nazwa produktu jest nieprawidłowa.',
};

const productNameString = {
  'string.base': 'Właściwość "name" musi być typu "string".',
};

const productNameMin = {
  'string.min': 'Nazwa produktu musi mieć minimum 3 znaki.',
};

const productNameMax = {
  'string.max': 'Nazwa produktu może mieć maksymalnie 256 znaków.',
};

// DESCRIPTION
const descriptionRequired = {
  'any.required': 'Właściwość "description" jest wymagana.',
};

const descriptionString = {
  'string.base': 'Właściwość "description" musi być typu "string".',
};

const descriptionMin = {
  'string.min': 'Opis produktu musi mieć minimum 3 znaki.',
};

const descriptionMax = {
  'string.max': 'Opis produktu może mieć maksymalnie 10000 znaków.',
};

// QUANTITY
const quantityRequired = {
  'any.required': 'Właściwość "quantity" jest wymagana.',
};

const quantityString = {
  'string.base': 'Właściwość "quantity" musi być typu "string".',
};

const quantityPattern = {
  'string.pattern.base': 'Liczba dostępnych sztuk jest nieprawidłowa.',
};

// PRICE
const priceRequired = {
  'any.required': 'Właściwość "price" jest wymagana.',
};

const priceString = {
  'string.base': 'Właściwość "price" musi być typu "string".',
};

const pricePattern = {
  'string.pattern.base': 'Cena jest nieprawidłowa.',
};

// CATEGORY
const categoryRequired = {
  'any.required': 'Właściwość "category" jest wymagana.',
};

const categoryString = {
  'string.base': 'Właściwość "category" musi być typu "string".',
};

// THUMBNAIL
const thumbnailRequired = {
  'any.required': 'Właściwość "thumbnail" jest wymagana.',
};

const thumbnailString = {
  'string.base': 'Właściwość "thumbnail" musi być typu "string".',
};

const thumbnailPattern = {
  'string.pattern.base': 'Ścieżka do pliku jest nieprawidłowa.',
};

// GALLERY
const galleryRequired = {
  'any.required': 'Właściwość "gallery" jest wymagana.',
};

const galleryArray = {
  'array.base': 'Właściwość "gallery" musi być typu "array".',
};

const galleryMessages = {
  ...galleryRequired,
  ...galleryArray,
};

const thumbnailMessages = {
  ...thumbnailPattern,
  ...thumbnailString,
  ...thumbnailRequired,
};

const categoryMessages = {
  ...categoryRequired,
  ...categoryString,
};

const priceMessages = {
  ...priceRequired,
  ...priceString,
  ...pricePattern,
};

const productNameMessages = {
  ...productNameRequired,
  ...productNamePattern,
  ...productNameString,
  ...productNameMin,
  ...productNameMax,
};

const descriptionMessages = {
  ...descriptionRequired,
  ...descriptionString,
  ...descriptionMin,
  ...descriptionMax,
};

const quantityMessages = {
  ...quantityRequired,
  ...quantityString,
  ...quantityPattern,
};

module.exports = {
  galleryRequired,
  galleryArray,
  galleryMessages,
  thumbnailPattern,
  thumbnailString,
  thumbnailRequired,
  thumbnailMessages,
  categoryRequired,
  categoryString,
  categoryMessages,
  priceRequired,
  priceString,
  pricePattern,
  priceMessages,
  productNameRequired,
  productNamePattern,
  productNameString,
  productNameMin,
  productNameMax,
  productNameMessages,
  descriptionRequired,
  descriptionString,
  descriptionMin,
  descriptionMax,
  descriptionMessages,
  quantityRequired,
  quantityString,
  quantityPattern,
  quantityMessages,
};
