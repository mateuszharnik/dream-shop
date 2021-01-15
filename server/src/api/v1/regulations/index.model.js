const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const {
  contentMessages,
  nameMessages,
} = require('../../../helpers/errors/messages/regulations');

const regulationsConfig = (id = true, timestamp = true, withName = false) => {
  let config = {
    content: Joi.string()
      .trim()
      .min(3)
      .max(20000)
      .required()
      .messages(contentMessages),
  };

  if (withName) {
    config = {
      ...config,
      name: Joi.string().trim().min(3).max(256)
        .required()
        .messages(nameMessages),
    };
  }

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const regulationsSchema = (regulations, id = true, timestamps = true, withName = false) => {
  const schema = Joi.object()
    .keys(regulationsConfig(id, timestamps, withName))
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(regulations);

  return { schemaError, data };
};

module.exports = {
  regulationsSchema,
};
