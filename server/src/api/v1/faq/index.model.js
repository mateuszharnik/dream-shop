const Joi = require('joi');
const { faqTitleRegExp } = require('../../../helpers/regexp');
const {
  categoryMessages,
  titleMessages,
  contentMessages,
} = require('../../../helpers/errors/messages/faq');
const {
  TEN,
  FIVE_THOUSAND,
  ONE_THOUSAND,
} = require('../../../helpers/constants/numbers');
const {
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
} = require('../../../helpers/constants/faq');

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
      .min(TEN)
      .max(ONE_THOUSAND)
      .regex(faqTitleRegExp)
      .required()
      .messages(titleMessages),
    content: Joi.string()
      .trim()
      .min(TEN)
      .max(FIVE_THOUSAND)
      .required()
      .messages(contentMessages),
  });

  const { error: schemaError, value: data } = schema.validate(faq);

  return { schemaError, data };
};

module.exports = faqSchema;
