const Joi = require('joi');
const {
  regulationNameMinLength,
  regulationNameMaxLength,
  contentMinLength,
  contentMaxLength,
} = require('../../../helpers/variables/regulations');
const {
  contentMessages,
  nameMessages,
} = require('../../../helpers/errors/messages/regulations');

const regulationsSchema = (regulations) => {
  const schema = Joi.object().keys({
    content: Joi.string()
      .trim()
      .min(contentMinLength)
      .max(contentMaxLength)
      .required()
      .messages(contentMessages),
    name: Joi.string()
      .trim()
      .min(regulationNameMinLength)
      .max(regulationNameMaxLength)
      .messages(nameMessages),
  });

  const { error: schemaError, value: data } = schema.validate(regulations);

  return { schemaError, data };
};

module.exports = regulationsSchema;
