const Joi = require('joi');
const {
  productCategoryRegExp,
  productCategoryNameRegExp,
} = require('../../../helpers/regexp');
const {
  productCategoryNameMessages,
  productCategoryMessages,
} = require('../../../helpers/errors/messages/product-categories');
const {
  productCategoryMaxLength,
  productCategoryMinLength,
  productCategoryNameMaxLength,
  productCategoryNameMinLength,
} = require('../../../helpers/variables/products');

const productCategorySchema = (category) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .regex(productCategoryNameRegExp)
      .trim()
      .min(productCategoryNameMinLength)
      .max(productCategoryNameMaxLength)
      .required()
      .messages(productCategoryNameMessages),
    category: Joi.string()
      .trim()
      .lowercase()
      .min(productCategoryMinLength)
      .max(productCategoryMaxLength)
      .regex(productCategoryRegExp)
      .required()
      .messages(productCategoryMessages),
  });

  const { error: schemaError, value: data } = schema.validate(category);

  return { schemaError, data };
};

module.exports = productCategorySchema;
