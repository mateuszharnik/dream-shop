const Joi = require('@hapi/joi');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const {
  nameMessages,
  surnameMessages,
} = require('../../../helpers/errors/messages/name');
const {
  zipCodeMessages,
  cityMessages,
  streetMessages,
  streetNumberMessages,
} = require('../../../helpers/errors/messages/address');
const {
  nameRegExp,
  emailRegExp,
  phoneRegExp,
  streetNumberRegExp,
  zipCodeRegExp,
  dbIdRegExp,
  productPriceRegExp,
  thumbnailRegExp,
  productNameRegExp,
} = require('../../../helpers/regexp');
const {
  productNameMessages,
  priceMessages,
  quantityMessages,
  thumbnailMessages,
  categoryNameMessages,
  productCompanyNameMessages,
} = require('../../../helpers/errors/messages/product');

const orderConfig = (id = true, timestamp = true) => {
  let config = {
    products: Joi.array()
      .items(
        Joi.object().keys({
          _id: Joi.string().trim().regex(dbIdRegExp).required(),
          name: Joi.string()
            .trim()
            .min(3)
            .max(256)
            .regex(productNameRegExp)
            .required()
            .messages(productNameMessages),
          company_name: Joi.string()
            .trim()
            .min(3)
            .max(512)
            .required()
            .messages(productCompanyNameMessages),
          price: Joi.string()
            .trim()
            .regex(productPriceRegExp)
            .required()
            .messages(priceMessages),
          thumbnail: Joi.string()
            .trim()
            .regex(thumbnailRegExp)
            .required()
            .messages(thumbnailMessages),
          category_name: Joi.string()
            .trim()
            .invalid('bestsellery', 'nowości')
            .required()
            .messages(categoryNameMessages),
          quantity: Joi.number()
            .min(1)
            .max(9999)
            .required()
            .messages(quantityMessages),
        }),
      )
      .min(1)
      .required(),
    contact: Joi.object()
      .keys({
        name: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(3)
          .max(30)
          .required()
          .messages(nameMessages),
        surname: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(3)
          .max(30)
          .required()
          .messages(surnameMessages),
        email: Joi.string()
          .trim()
          .regex(emailRegExp)
          .required()
          .messages(emailMessages),
        phone: Joi.string()
          .trim()
          .regex(phoneRegExp)
          .required()
          .messages(phoneMessages),
        city: Joi.string()
          .trim()
          .min(2)
          .max(100)
          .required()
          .messages(cityMessages),
        zip_code: Joi.string()
          .trim()
          .regex(zipCodeRegExp)
          .required()
          .messages(zipCodeMessages),
        street: Joi.string()
          .trim()
          .min(2)
          .max(100)
          .required()
          .messages(streetMessages),
        street_number: Joi.string()
          .trim()
          .regex(streetNumberRegExp)
          .required()
          .messages(streetNumberMessages),
      })
      .required(),
    paid: Joi.boolean().valid(true).required(),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const orderSchema = (order, id = true, timestamps = true) => {
  const schema = Joi.object()
    .keys(orderConfig(id, timestamps))
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(order);

  return { schemaError, data };
};

module.exports = {
  orderSchema,
};
