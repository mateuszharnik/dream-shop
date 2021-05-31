const Joi = require('joi');
const { faqTitleRegExp } = require('../../../helpers/regexp');
const {
  categoryMessages,
  titleMessages,
  contentMessages,
} = require('../../../helpers/errors/messages/faq');
const {
  contentMinLength,
  contentMaxLength,
  titleMinLength,
  titleMaxLength,
} = require('../../../helpers/variables/faq');
const {
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
} = require('../../../helpers/variables/constants/faq');

const faqSchema = (faq) => {
  const schema = Joi.object().keys({
    category: Joi.string()
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
      .messages(categoryMessages),
    title: Joi.string()
      .trim()
      .min(titleMinLength)
      .max(titleMaxLength)
      .regex(faqTitleRegExp)
      .required()
      .messages(titleMessages),
    content: Joi.string()
      .trim()
      .min(contentMinLength)
      .max(contentMaxLength)
      .required()
      .messages(contentMessages),
  });

  const { error: schemaError, value: data } = schema.validate(faq);

  return { schemaError, data };
};

module.exports = faqSchema;
