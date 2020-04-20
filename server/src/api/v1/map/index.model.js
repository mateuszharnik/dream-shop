const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { mapRegExp } = require('../../../helpers/regexp');
const { mapMessages } = require('../../../helpers/errors/messages/map');

const mapConfig = (id = true, timestamps = true) => {
  let config = {
    latlng: Joi.string().trim().regex(mapRegExp)
      .required()
      .messages(mapMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const mapSchema = (map, id = true, timestamps = true) => {
  const schema = Joi.object().keys(mapConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(map);

  return { schemaError, data };
};

module.exports = {
  mapSchema,
};
