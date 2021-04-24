const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  PRODUCT_CATEGORY_NAME_REQUIRED,
  PRODUCT_CATEGORY_NAME_NOT_CORRECT,
  PRODUCT_CATEGORY_REQUIRED,
  PRODUCT_CATEGORY_INVALID,
  PRODUCT_CATEGORY_PATTERN,
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
