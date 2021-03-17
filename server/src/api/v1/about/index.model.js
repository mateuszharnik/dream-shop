const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const {
  informationMessages,
} = require('../../../helpers/errors/messages/information');

const aboutSchema = (about) => {
  const schema = Joi.object()
    .keys({
      information: Joi.string()
        .trim()
        .min(1)
        .max(50000)
        .allow('')
        .required()
        .messages(informationMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(about);

  return { schemaError, data };
};

module.exports = {
  aboutSchema,
};
