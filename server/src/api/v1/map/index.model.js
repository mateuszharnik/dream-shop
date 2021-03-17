const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { mapRegExp } = require('../../../helpers/regexp');
const { mapMessages } = require('../../../helpers/errors/messages/map');

const mapSchema = (map) => {
  const schema = Joi.object()
    .keys({
      latlng: Joi.string()
        .trim()
        .regex(mapRegExp)
        .required()
        .messages(mapMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(map);

  return { schemaError, data };
};

module.exports = {
  mapSchema,
};
