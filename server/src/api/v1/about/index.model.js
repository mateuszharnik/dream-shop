const Joi = require('joi');
const {
  informationMessages,
} = require('../../../helpers/errors/messages/about');
const {
  informationMinLength,
  informationMaxLength,
} = require('../../../helpers/variables/about');

const aboutSchema = (about) => {
  const schema = Joi.object().keys({
    information: Joi.string()
      .trim()
      .min(informationMinLength)
      .max(informationMaxLength)
      .allow('')
      .required()
      .messages(informationMessages),
  });

  const { error: schemaError, value: data } = schema.validate(about);

  return { schemaError, data };
};

module.exports = aboutSchema;
