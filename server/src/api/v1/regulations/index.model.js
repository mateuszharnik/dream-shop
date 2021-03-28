const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const {
  contentMessages,
  nameMessages,
} = require('../../../helpers/errors/messages/regulations');

const regulationsSchema = (regulations) => {
  const schema = Joi.object()
    .keys({
      content: Joi.string()
        .trim()
        .min(3)
        .max(20000)
        .required()
        .messages(contentMessages),
      name: Joi.string()
        .trim()
        .min(3)
        .max(256)
        .messages(nameMessages),
    })
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(regulations);

  return { schemaError, data };
};

module.exports = {
  regulationsSchema,
};
