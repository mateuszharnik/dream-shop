const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');

const productConfig = (id = true, timestamps = true) => {
  let config = {
    name: Joi.string().trim().required(),
    short_description: Joi.string().trim().required(),
    description: Joi.string().trim().allow('').required(),
    quantity: Joi.number().required(),
    price: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    thumbnail: Joi.string().trim().allow('').required(),
    gallery: Joi.string().trim().allow('').required(),
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
