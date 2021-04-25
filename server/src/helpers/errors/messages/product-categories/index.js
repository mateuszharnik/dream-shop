const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  PRODUCT_CATEGORY_NAME_REQUIRED,
  PRODUCT_CATEGORY_NAME_NOT_CORRECT,
  PRODUCT_CATEGORY_NAME_MIN_LENGTH,
  PRODUCT_CATEGORY_NAME_MAX_LENGTH,
  PRODUCT_CATEGORY_REQUIRED,
  PRODUCT_CATEGORY_INVALID,
  PRODUCT_CATEGORY_PATTERN,
  PRODUCT_CATEGORY_MIN_LENGTH,
  PRODUCT_CATEGORY_MAX_LENGTH,
} = require('../../../constants/products');

// CATEGORY NAME
const productCategoryNameRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const productCategoryNameString = {
  'string.base': TYPE_STRING,
};

const productCategoryNamePattern = {
  'string.pattern.base': PRODUCT_CATEGORY_NAME_NOT_CORRECT,
};

const productCategoryNameNotEmpty = {
  'string.empty': PRODUCT_CATEGORY_NAME_REQUIRED,
};

const productCategoryNameMin = {
  'string.min': PRODUCT_CATEGORY_NAME_MIN_LENGTH,
};

const productCategoryNameMax = {
  'string.max': PRODUCT_CATEGORY_NAME_MAX_LENGTH,
};

// CATEGORY
const productCategoryRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const productCategoryInvalid = {
  'any.invalid': PRODUCT_CATEGORY_INVALID,
};

const productCategoryString = {
  'string.base': TYPE_STRING,
};

const productCategoryPattern = {
  'string.pattern.base': PRODUCT_CATEGORY_PATTERN,
};

const productCategoryNotEmpty = {
  'string.empty': PRODUCT_CATEGORY_REQUIRED,
};

const productCategoryMin = {
  'string.min': PRODUCT_CATEGORY_MIN_LENGTH,
};

const productCategoryMax = {
  'string.max': PRODUCT_CATEGORY_MAX_LENGTH,
};

const productCategoryNameMessages = {
  ...productCategoryNameRequired,
  ...productCategoryNameNotEmpty,
  ...productCategoryNameString,
  ...productCategoryNamePattern,
  ...productCategoryNameMin,
  ...productCategoryNameMax,
};

const productCategoryMessages = {
  ...productCategoryRequired,
  ...productCategoryNotEmpty,
  ...productCategoryString,
  ...productCategoryPattern,
  ...productCategoryInvalid,
  ...productCategoryMin,
  ...productCategoryMax,
};

module.exports = {
  productCategoryNameRequired,
  productCategoryNameNotEmpty,
  productCategoryNameString,
  productCategoryNamePattern,
  productCategoryNameMessages,
  productCategoryNameMin,
  productCategoryNameMax,
  productCategoryInvalid,
  productCategoryRequired,
  productCategoryNotEmpty,
  productCategoryString,
  productCategoryPattern,
  productCategoryMessages,
  productCategoryMin,
  productCategoryMax,
};
