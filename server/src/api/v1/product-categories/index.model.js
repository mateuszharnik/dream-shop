const Joi = require('joi');
const { joiConfigMessages, joiArrayConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { productCategoryRegExp, productCategoryNameRegExp } = require('../../../helpers/regexp');
const { productCategoryNameMessages, productCategoryMessages } = require('../../../helpers/errors/messages/product-categories');

const categoriesConfig = (id = true, timestamps = true) => {
  let config = {
    name: Joi.string().regex(productCategoryNameRegExp).trim().required()
      .messages(productCategoryNameMessages),
    category: Joi.string().trim().lowercase().regex(productCategoryRegExp)
      .messages(productCategoryMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const productCategorySchema = (categories, id = true, timestamps = true) => {
  const schema = Joi.object().keys(categoriesConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(categories);

  return { schemaError, data };
};

const productCategoriesSchema = (categories, id = true, timestamps = true) => {
  const schema = Joi.array().items(
    Joi.object().keys(categoriesConfig(id, timestamps)).required().messages(joiConfigMessages),
  ).required().messages(joiArrayConfigMessages);

  const { error: schemaError, value: data } = schema.validate(categories);

  return { schemaError, data };
};

module.exports = {
  productCategoriesSchema,
  productCategorySchema,
};
