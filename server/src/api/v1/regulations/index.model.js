const Joi = require('joi');
const {
  THREE,
  THREE_HUNDRED,
  FIFTY_THOUSAND,
} = require('../../../helpers/constants/numbers');
const {
  contentMessages,
  nameMessages,
} = require('../../../helpers/errors/messages/regulations');

const regulationsSchema = (regulations) => {
  const schema = Joi.object().keys({
    content: Joi.string()
      .trim()
      .min(THREE)
      .max(FIFTY_THOUSAND)
      .required()
      .messages(contentMessages),
    name: Joi.string()
      .trim()
      .min(THREE)
      .max(THREE_HUNDRED)
      .messages(nameMessages),
  });

  const { error: schemaError, value: data } = schema.validate(regulations);

  return { schemaError, data };
};

module.exports = regulationsSchema;
