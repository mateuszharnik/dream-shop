const Joi = require('joi');
const { emailRegExp, nameRegExp } = require('../../../helpers/regexp');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { termsMessages } = require('../../../helpers/errors/messages/terms');
const {
  subjectMessages,
  messageMessages,
} = require('../../../helpers/errors/messages/messages');
const {
  subjectMinLength,
  subjectMaxLength,
  messageMinLength,
  messageMaxLength,
} = require('../../../helpers/variables/messages');
const {
  nameMinLength,
  nameMaxLength,
} = require('../../../helpers/variables/users');

const messagesSchema = (message) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .regex(nameRegExp)
      .min(nameMinLength)
      .max(nameMaxLength)
      .required()
      .messages(nameMessages),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
    subject: Joi.string()
      .trim()
      .min(subjectMinLength)
      .max(subjectMaxLength)
      .required()
      .messages(subjectMessages),
    message: Joi.string()
      .trim()
      .min(messageMinLength)
      .max(messageMaxLength)
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
