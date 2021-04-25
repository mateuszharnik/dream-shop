const Joi = require('joi');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const {
  nameMessages,
  surnameMessages,
} = require('../../../helpers/errors/messages/name');
const {
  zipCodeMessages,
} = require('../../../helpers/errors/messages/zip-code');
const { cityMessages } = require('../../../helpers/errors/messages/city');
const { streetMessages } = require('../../../helpers/errors/messages/street');
const {
  streetNumberMessages,
} = require('../../../helpers/errors/messages/street-number');
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
const { isPaidMessages } = require('../../../helpers/errors/messages/orders');
const { idMessages } = require('../../../helpers/errors/messages/id');
const {
  THREE,
  FIFTY,
  ONE_HUNDRED,
  ONE,
  ONE_THOUSAND,
  THREE_HUNDRED,
} = require('../../../helpers/constants/numbers');
const { BESTSELLERS, NEWS } = require('../../../helpers/constants/products');

const orderSchema = (order) => {
  const schema = Joi.object().keys({
    products: Joi.array()
      .items(
        Joi.object().keys({
          _id: Joi.string()
            .trim()
            .regex(dbIdRegExp)
            .required()
            .messages(idMessages),
          name: Joi.string()
            .trim()
            .min(THREE)
            .max(THREE_HUNDRED)
            .regex(productNameRegExp)
            .required()
            .messages(productNameMessages),
          company_name: Joi.string()
            .trim()
            .min(THREE)
            .max(THREE_HUNDRED)
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
            .invalid(BESTSELLERS, NEWS)
            .required()
            .messages(categoryNameMessages),
          quantity: Joi.number()
            .min(ONE)
            .max(ONE_THOUSAND)
            .required()
            .messages(quantityMessages),
        }),
      )
      .min(ONE)
      .required(),
    contact: Joi.object()
      .keys({
        name: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(THREE)
          .max(FIFTY)
          .required()
          .messages(nameMessages),
        surname: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(THREE)
          .max(FIFTY)
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
          .min(THREE)
          .max(ONE_HUNDRED)
          .required()
          .messages(cityMessages),
        zip_code: Joi.string()
          .trim()
          .regex(zipCodeRegExp)
          .required()
          .messages(zipCodeMessages),
        street: Joi.string()
          .trim()
          .min(THREE)
          .max(ONE_HUNDRED)
          .required()
          .messages(streetMessages),
        street_number: Joi.string()
          .trim()
          .regex(streetNumberRegExp)
          .required()
          .messages(streetNumberMessages),
      })
      .required(),
    isPaid: Joi.boolean().required().messages(isPaidMessages),
  });

  const { error: schemaError, value: data } = schema.validate(order);

  return { schemaError, data };
};

module.exports = orderSchema;
