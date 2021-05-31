const Joi = require('joi');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { orderProductsMinLength } = require('../../../helpers/variables/orders');
const { cityMessages } = require('../../../helpers/errors/messages/city');
const { streetMessages } = require('../../../helpers/errors/messages/street');
const { isPaidMessages } = require('../../../helpers/errors/messages/orders');
const { idMessages } = require('../../../helpers/errors/messages/id');
const {
  zipCodeMessages,
} = require('../../../helpers/errors/messages/zip-code');
const {
  streetNumberMessages,
} = require('../../../helpers/errors/messages/street-number');
const {
  surnameMinLength,
  surnameMaxLength,
  nameMinLength,
  nameMaxLength,
} = require('../../../helpers/variables/users');
const {
  nameMessages,
  surnameMessages,
} = require('../../../helpers/errors/messages/name');
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
const {
  streetMinLength,
  streetMaxLength,
  cityMinLength,
  cityMaxLength,
} = require('../../../helpers/variables/contact');
const {
  productNameMinLength,
  productNameMaxLength,
  companyNameMinLength,
  companyNameMaxLength,
  productQuantityRequiredInOrderLength,
  productQuantityMaxLength,
} = require('../../../helpers/variables/products');
const {
  BESTSELLERS_PL,
  NEWS_PL,
} = require('../../../helpers/constants/products');

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
            .min(productNameMinLength)
            .max(productNameMaxLength)
            .regex(productNameRegExp)
            .required()
            .messages(productNameMessages),
          company_name: Joi.string()
            .trim()
            .min(companyNameMinLength)
            .max(companyNameMaxLength)
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
            .invalid(BESTSELLERS_PL, NEWS_PL)
            .required()
            .messages(categoryNameMessages),
          quantity: Joi.number()
            .min(productQuantityRequiredInOrderLength)
            .max(productQuantityMaxLength)
            .required()
            .messages(quantityMessages),
        }),
      )
      .min(orderProductsMinLength)
      .required(),
    contact: Joi.object()
      .keys({
        name: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(nameMinLength)
          .max(nameMaxLength)
          .required()
          .messages(nameMessages),
        surname: Joi.string()
          .trim()
          .regex(nameRegExp)
          .min(surnameMinLength)
          .max(surnameMaxLength)
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
          .min(cityMinLength)
          .max(cityMaxLength)
          .required()
          .messages(cityMessages),
        zip_code: Joi.string()
          .trim()
          .regex(zipCodeRegExp)
          .required()
          .messages(zipCodeMessages),
        street: Joi.string()
          .trim()
          .min(streetMinLength)
          .max(streetMaxLength)
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
