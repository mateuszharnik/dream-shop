const Joi = require('joi');
const {
  productCategoryRegExp,
  productCategoryNameRegExp,
} = require('../../../helpers/regexp');
const {
  productCategoryNameMessages,
  productCategoryMessages,
} = require('../../../helpers/errors/messages/product-categories');
const { THREE, ONE_HUNDRED } = require('../../../helpers/constants/numbers');

const productCategorySchema = (category) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .regex(productCategoryNameRegExp)
      .trim()
      .min(THREE)
      .max(ONE_HUNDRED)
      .required()
      .messages(productCategoryNameMessages),
    category: Joi.string()
      .trim()
      .lowercase()
      .min(THREE)
      .max(ONE_HUNDRED)
      .regex(productCategoryRegExp)
      .required()
      .messages(productCategoryMessages),
  });

  const { error: schemaError, value: data } = schema.validate(category);

  return { schemaError, data };
};

module.exports = productCategorySchema;
