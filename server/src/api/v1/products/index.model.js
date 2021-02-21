const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const {
  productNameMessages,
  priceMessages,
  quantityMessages,
  descriptionMessages,
  categoryMessages,
  thumbnailMessages,
  galleryMessages,
  categoryNameMessages,
  productCompanyNameMessages,
} = require('../../../helpers/errors/messages/product');
const {
  thumbnailRegExp, productPriceRegExp, productNameRegExp, productCategoryRegExp,
} = require('../../../helpers/regexp');

const productConfig = (id = true, timestamps = true) => {
  let config = {
    name: Joi.string().trim().min(3).max(256)
      .regex(productNameRegExp)
      .required()
      .messages(productNameMessages),
    company_name: Joi.string().trim().min(3).max(512)
      .required()
      .messages(productCompanyNameMessages),
    description: Joi.string().trim().min(3).max(10000)
      .required()
      .messages(descriptionMessages),
    quantity: Joi.string().min(0).max(9999).required()
      .messages(quantityMessages),
    price: Joi.string().trim().regex(productPriceRegExp).required()
      .messages(priceMessages),
    category_name: Joi.string().trim().invalid('bestsellery', 'nowości')
      .required()
      .messages(categoryNameMessages),
    category: Joi.string().trim().lowercase().regex(productCategoryRegExp)
      .required()
      .messages(categoryMessages),
    thumbnail: Joi.string().trim().regex(thumbnailRegExp).required()
      .messages(thumbnailMessages),
    gallery: Joi.array().items(
      Joi.string().trim().regex(thumbnailRegExp),
    ).max(9).messages(galleryMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const productSchema = (product, id = true, timestamps = true) => {
  const schema = Joi.object().keys(productConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(product);

  return { schemaError, data };
};

module.exports = {
  productSchema,
};
