const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { termsMessages } = require('../../../helpers/errors/messages/terms');
const {
  subjectMessages,
  messageMessages,
} = require('../../../helpers/errors/messages/messages');
const { emailRegExp, nameRegExp } = require('../../../helpers/regexp');

const messagesSchema = (message) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .trim()
        .regex(nameRegExp)
        .min(3)
        .max(50)
        .required()
        .messages(nameMessages),
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .required()
        .messages(emailMessages),
      subject: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required()
        .messages(subjectMessages),
      message: Joi.string()
        .trim()
        .min(3)
        .max(2000)
        .required()
        .messages(messageMessages),
      terms_accepted: Joi.boolean()
        .valid(true)
        .required()
        .messages(termsMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(message);

  return { schemaError, data };
};

module.exports = {
  messagesSchema,
};
