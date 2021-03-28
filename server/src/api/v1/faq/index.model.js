const Joi = require('@hapi/joi');
const { faqTitleRegExp } = require('../../../helpers/regexp');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const {
  categoryMessages,
  titleMessages,
  contentMessages,
} = require('../../../helpers/errors/messages/faq');
const {
  RETURNS,
  DELIVERY,
  PAYMENT,
  SERVICE,
  PRODUCTS,
  DISCOUNTS,
  OTHERS,
} = require('../../../helpers/constants/faq');

const faqSchema = (faq) => {
  const schema = Joi.object()
    .keys({
      category: Joi.string()
        .trim()
        .valid(RETURNS, DELIVERY, PAYMENT, SERVICE, PRODUCTS, DISCOUNTS, OTHERS)
        .required()
        .messages(categoryMessages),
      title: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .regex(faqTitleRegExp)
        .required()
        .messages(titleMessages),
      content: Joi.string()
        .trim()
        .min(10)
        .max(5000)
        .required()
        .messages(contentMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(faq);

  return { schemaError, data };
};

module.exports = {
  faqSchema,
};
