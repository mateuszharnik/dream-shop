const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { emailRegExp } = require('../../../helpers/regexp');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { termsMessages } = require('../../../helpers/errors/messages/terms');

const newsletterConfig = (id = true, timestamps = true) => {
  let config = {
    email: Joi.string().trim().regex(emailRegExp)
      .required()
      .messages(emailMessages),
    terms_accepted: Joi.boolean().valid(true).required().messages(termsMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const newsletterSchema = (newsletter, id = true, timestamps = true) => {
  const schema = Joi.object().keys(newsletterConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(newsletter);

  return { schemaError, data };
};

module.exports = {
  newsletterSchema,
};
