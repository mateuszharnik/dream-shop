const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
  TYPE_ARRAY,
} = require('../../../constants/error-messages');
const {
  PRODUCT_NAME_REQUIRED,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_QUANTITY_NOT_CORRECT,
  PRODUCT_PRICE_NOT_CORRECT,
  PRODUCT_CATEGORY_NAME_NOT_CORRECT,
  PRODUCT_GALLERY_MAX_LENGTH,
} = require('../../../constants/products');
const { PATH_TO_FILE_NOT_CORRECT } = require('../../../constants/files');

// NAME
const productNameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const productNamePattern = {
  'string.pattern.base': PRODUCT_NAME_REQUIRED,
};

const productNameString = {
  'string.base': TYPE_STRING,
};

const productNameMin = {
  'string.min': PRODUCT_NAME_MIN_LENGTH,
};

const productNameMax = {
  'string.max': PRODUCT_NAME_MAX_LENGTH,
};

// COMPANY NAME
const productCompanyNameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const productCompanyNameString = {
  'string.base': TYPE_STRING,
};

const productCompanyNameMin = {
  'string.min': COMPANY_NAME_MIN_LENGTH,
};

const productCompanyNameMax = {
  'string.max': COMPANY_NAME_MAX_LENGTH,
};

// DESCRIPTION
const descriptionRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const descriptionString = {
  'string.base': TYPE_STRING,
};

const descriptionMin = {
  'string.min': PRODUCT_DESCRIPTION_MIN_LENGTH,
};

const descriptionMax = {
  'string.max': PRODUCT_DESCRIPTION_MAX_LENGTH,
};

// QUANTITY
const quantityRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const quantityString = {
  'string.base': TYPE_STRING,
};

const quantityPattern = {
  'string.pattern.base': PRODUCT_QUANTITY_NOT_CORRECT,
};

// PRICE
const priceRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const priceString = {
  'string.base': TYPE_STRING,
};

const pricePattern = {
  'string.pattern.base': PRODUCT_PRICE_NOT_CORRECT,
};

// CATEGORY
const categoryRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const categoryString = {
  'string.base': TYPE_STRING,
};

// CATEGORY NAME
const categoryNameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const categoryNameString = {
  'string.base': TYPE_STRING,
};

const categoryNamePattern = {
  'string.pattern.base': PRODUCT_CATEGORY_NAME_NOT_CORRECT,
};

// THUMBNAIL
const thumbnailRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const thumbnailString = {
  'string.base': TYPE_STRING,
};

const thumbnailPattern = {
  'string.pattern.base': PATH_TO_FILE_NOT_CORRECT,
};

// GALLERY
const galleryRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const galleryMax = {
  'array.max': PRODUCT_GALLERY_MAX_LENGTH,
};

const galleryArray = {
  'array.base': TYPE_ARRAY,
};

const galleryMessages = {
  ...galleryRequired,
  ...galleryArray,
  ...galleryMax,
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

const categoryNameMessages = {
  ...categoryNameRequired,
  ...categoryNameString,
  ...categoryNamePattern,
};

const productCompanyNameMessages = {
  ...productCompanyNameRequired,
  ...productCompanyNameString,
  ...productCompanyNameMin,
  ...productCompanyNameMax,
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
  galleryMax,
  galleryMessages,
  thumbnailPattern,
  thumbnailString,
  thumbnailRequired,
  thumbnailMessages,
  categoryRequired,
  categoryString,
  categoryMessages,
  priceRequired,
  categoryNameMessages,
  categoryNameRequired,
  categoryNameString,
  categoryNamePattern,
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
  productCompanyNameRequired,
  productCompanyNameString,
  productCompanyNameMin,
  productCompanyNameMax,
  productCompanyNameMessages,
};
