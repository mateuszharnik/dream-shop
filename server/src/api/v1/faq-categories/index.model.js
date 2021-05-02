const Joi = require('joi');
const { categoryMessages } = require('../../../helpers/errors/messages/faq');
const {
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
} = require('../../../helpers/constants/faq');

const faqCategoriesSchema = (faqCategories) => {
  const schema = Joi.string()
    .trim()
    .valid(
      RETURNS_PL,
      DELIVERY_PL,
      PAYMENT_PL,
      SERVICE_PL,
      PRODUCTS_PL,
      DISCOUNTS_PL,
      OTHERS_PL,
    )
    .required()
    .messages(categoryMessages);

  const { error: schemaError, value: data } = schema.validate(faqCategories);

  return { schemaError, data };
};

module.exports = faqCategoriesSchema;
