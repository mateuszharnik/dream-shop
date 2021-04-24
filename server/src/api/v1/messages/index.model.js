const Joi = require('joi');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { termsMessages } = require('../../../helpers/errors/messages/terms');
const {
  subjectMessages,
  messageMessages,
} = require('../../../helpers/errors/messages/messages');
const {
  THREE,
  FIFTY,
  THREE_HUNDRED,
  FIVE_THOUSAND,
} = require('../../../helpers/constants/numbers');
const { emailRegExp, nameRegExp } = require('../../../helpers/regexp');

const messagesSchema = (message) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .regex(nameRegExp)
      .min(THREE)
      .max(FIFTY)
      .required()
      .messages(nameMessages),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
    subject: Joi.string()
      .trim()
      .min(THREE)
      .max(THREE_HUNDRED)
      .required()
      .messages(subjectMessages),
    message: Joi.string()
      .trim()
      .min(THREE)
      .max(FIVE_THOUSAND)
      .required()
      .messages(messageMessages),
    terms_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(termsMessages),
  });

  const { error: schemaError, value: data } = schema.validate(message);

  return { schemaError, data };
};

module.exports = messagesSchema;
