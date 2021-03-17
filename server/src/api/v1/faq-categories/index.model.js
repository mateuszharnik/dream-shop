const Joi = require('@hapi/joi');
const { categoryMessages } = require('../../../helpers/errors/messages/faq');
const { faqsCategoriesConstants } = require('../../../helpers/constants');

const {
  RETURNS,
  DELIVERY,
  PAYMENT,
  SERVICE,
  PRODUCTS,
  DISCOUNTS,
  OTHERS,
} = faqsCategoriesConstants;

const faqCategoriesSchema = (faqCategories) => {
  const schema = Joi.string()
    .trim()
    .valid(RETURNS, DELIVERY, PAYMENT, SERVICE, PRODUCTS, DISCOUNTS, OTHERS)
    .required()
    .messages(categoryMessages);

  const { error: schemaError, value: data } = schema.validate(faqCategories);

  return { schemaError, data };
};

module.exports = {
  faqCategoriesSchema,
};
