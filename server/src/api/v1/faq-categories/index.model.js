const Joi = require('joi');
const { categoryMessages } = require('../../../helpers/errors/messages/faq');
const {
  RETURNS,
  DELIVERY,
  PAYMENT,
  SERVICE,
  PRODUCTS,
  DISCOUNTS,
  OTHERS,
} = require('../../../helpers/constants/faq');

const faqCategoriesSchema = (faqCategories) => {
  const schema = Joi.string()
    .trim()
    .valid(RETURNS, DELIVERY, PAYMENT, SERVICE, PRODUCTS, DISCOUNTS, OTHERS)
    .required()
    .messages(categoryMessages);

  const { error: schemaError, value: data } = schema.validate(faqCategories);

  return { schemaError, data };
};

module.exports = faqCategoriesSchema;
