const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');

const productConfig = (id = true, timestamps = true) => {
  let config = {
    name: Joi.string().trim().min(3).max(256)
      .regex(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&()+=?/]+$/)
      .required(),
    description: Joi.string().trim().min(3).max(10000)
      .required(),
    quantity: Joi.string().regex(/^[0-9]{1,10}$/).required(),
    price: Joi.string().trim().regex(/^[0-6]{1,10},[0-9]{2} zł$/).required(),
    category: Joi.string().trim().invalid('bestsellery', 'nowosci')
      .required(),
    thumbnail: Joi.string().trim().required(),
    // gallery: Joi.string().trim().allow('').required(),
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
