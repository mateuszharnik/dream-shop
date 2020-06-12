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
} = require('../../../helpers/errors/messages/product');
const {
  quantityRegExp, thumbnailRegExp, productPriceRegExp, productNameRegExp,
} = require('../../../helpers/regexp');

const productConfig = (id = true, timestamps = true) => {
  let config = {
    name: Joi.string().trim().min(3).max(256)
      .regex(productNameRegExp)
      .required()
      .messages(productNameMessages),
    description: Joi.string().trim().min(3).max(10000)
      .required()
      .messages(descriptionMessages),
    quantity: Joi.string().regex(quantityRegExp).required().messages(quantityMessages),
    price: Joi.string().trim().regex(productPriceRegExp).required()
      .messages(priceMessages),
    category: Joi.string().trim().invalid('bestsellery', 'nowosci')
      .required()
      .messages(categoryMessages),
    thumbnail: Joi.string().trim().regex(thumbnailRegExp).required()
      .messages(thumbnailMessages),
    gallery: Joi.array().items(
      Joi.string().trim().regex(thumbnailRegExp),
    ).messages(galleryMessages),
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
