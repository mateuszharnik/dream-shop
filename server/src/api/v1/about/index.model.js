const Joi = require('joi');
const { TEN, FIFTY_THOUSAND } = require('../../../helpers/constants/numbers');
const {
  informationMessages,
} = require('../../../helpers/errors/messages/about');

const aboutSchema = (about) => {
  const schema = Joi.object().keys({
    information: Joi.string()
      .trim()
      .min(TEN)
      .max(FIFTY_THOUSAND)
      .allow('')
      .required()
      .messages(informationMessages),
  });

  const { error: schemaError, value: data } = schema.validate(about);

  return { schemaError, data };
};

module.exports = aboutSchema;
