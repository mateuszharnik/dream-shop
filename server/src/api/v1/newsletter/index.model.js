const Joi = require('joi');
const { emailRegExp } = require('../../../helpers/regexp');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { termsMessages } = require('../../../helpers/errors/messages/terms');

const newsletterSchema = (newsletter) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
    terms_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(termsMessages),
  });

  const { error: schemaError, value: data } = schema.validate(newsletter);

  return { schemaError, data };
};

module.exports = newsletterSchema;
