const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');
const {
  productCategoryNameRequiredMessage,
  productCategoryNameNotCorrectMessage,
  productCategoryNameMinLengthMessage,
  productCategoryNameMaxLengthMessage,
  productCategoryRequiredMessage,
  productCategoryInvalidMessage,
  productCategoryPatternMessage,
  productCategoryMinLengthMessage,
  productCategoryMaxLengthMessage,
} = require('../../../variables/products');

// CATEGORY NAME
const productCategoryNameRequired = {
  'any.required': propertyRequiredMessage,
};

const productCategoryNameString = {
  'string.base': typeStringMessage,
};

const productCategoryNamePattern = {
  'string.pattern.base': productCategoryNameNotCorrectMessage,
};

const productCategoryNameNotEmpty = {
  'string.empty': productCategoryNameRequiredMessage,
};

const productCategoryNameMin = {
  'string.min': productCategoryNameMinLengthMessage,
};

const productCategoryNameMax = {
  'string.max': productCategoryNameMaxLengthMessage,
};

// CATEGORY
const productCategoryRequired = {
  'any.required': propertyRequiredMessage,
};

const productCategoryInvalid = {
  'any.invalid': productCategoryInvalidMessage,
};

const productCategoryString = {
  'string.base': typeStringMessage,
};

const productCategoryPattern = {
  'string.pattern.base': productCategoryPatternMessage,
};

const productCategoryNotEmpty = {
  'string.empty': productCategoryRequiredMessage,
};

const productCategoryMin = {
  'string.min': productCategoryMinLengthMessage,
};

const productCategoryMax = {
  'string.max': productCategoryMaxLengthMessage,
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
