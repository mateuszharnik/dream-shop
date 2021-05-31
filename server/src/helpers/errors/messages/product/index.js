const { pathToFileNotCorrectMessage } = require('../../../variables/files');
const {
  productNameRequiredMessage,
  productNameMinLengthMessage,
  productNameMaxLengthMessage,
  companyNameMinLengthMessage,
  companyNameMaxLengthMessage,
  productDescriptionMinLengthMessage,
  productDescriptionMaxLengthMessage,
  productQuantityMinLengthMessage,
  productQuantityMaxLengthMessage,
  productPriceNotCorrectMessage,
  productCategoryNameNotCorrectMessage,
  productGalleryMaxLengthMessage,
} = require('../../../variables/products');
const {
  propertyRequiredMessage,
  typeStringMessage,
  typeArrayMessage,
  typeNumberMessage,
} = require('../../../variables/error-messages');

// NAME
const productNameRequired = {
  'any.required': propertyRequiredMessage,
};

const productNamePattern = {
  'string.pattern.base': productNameRequiredMessage,
};

const productNameString = {
  'string.base': typeStringMessage,
};

const productNameMin = {
  'string.min': productNameMinLengthMessage,
};

const productNameMax = {
  'string.max': productNameMaxLengthMessage,
};

// COMPANY NAME
const productCompanyNameRequired = {
  'any.required': propertyRequiredMessage,
};

const productCompanyNameString = {
  'string.base': typeStringMessage,
};

const productCompanyNameMin = {
  'string.min': companyNameMinLengthMessage,
};

const productCompanyNameMax = {
  'string.max': companyNameMaxLengthMessage,
};

// DESCRIPTION
const descriptionRequired = {
  'any.required': propertyRequiredMessage,
};

const descriptionString = {
  'string.base': typeStringMessage,
};

const descriptionMin = {
  'string.min': productDescriptionMinLengthMessage,
};

const descriptionMax = {
  'string.max': productDescriptionMaxLengthMessage,
};

// QUANTITY
const quantityRequired = {
  'any.required': propertyRequiredMessage,
};

const quantityNumber = {
  'number.base': typeNumberMessage,
};

const quantityMin = {
  'number.min': productQuantityMinLengthMessage,
};

const quantityMax = {
  'number.max': productQuantityMaxLengthMessage,
};

// PRICE
const priceRequired = {
  'any.required': propertyRequiredMessage,
};

const priceString = {
  'string.base': typeStringMessage,
};

const pricePattern = {
  'string.pattern.base': productPriceNotCorrectMessage,
};

// CATEGORY
const categoryRequired = {
  'any.required': propertyRequiredMessage,
};

const categoryString = {
  'string.base': typeStringMessage,
};

// CATEGORY NAME
const categoryNameRequired = {
  'any.required': propertyRequiredMessage,
};

const categoryNameString = {
  'string.base': typeStringMessage,
};

const categoryNamePattern = {
  'string.pattern.base': productCategoryNameNotCorrectMessage,
};

// THUMBNAIL
const thumbnailRequired = {
  'any.required': propertyRequiredMessage,
};

const thumbnailString = {
  'string.base': typeStringMessage,
};

const thumbnailPattern = {
  'string.pattern.base': pathToFileNotCorrectMessage,
};

// GALLERY
const galleryRequired = {
  'any.required': propertyRequiredMessage,
};

const galleryMax = {
  'array.max': productGalleryMaxLengthMessage,
};

const galleryArray = {
  'array.base': typeArrayMessage,
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
  ...quantityNumber,
  ...quantityMin,
  ...quantityMax,
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
  quantityNumber,
  quantityMin,
  quantityMax,
  quantityMessages,
  productCompanyNameRequired,
  productCompanyNameString,
  productCompanyNameMin,
  productCompanyNameMax,
  productCompanyNameMessages,
};
