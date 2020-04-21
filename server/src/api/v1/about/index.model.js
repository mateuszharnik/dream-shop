const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { informationMessages } = require('../../../helpers/errors/messages/information');

const aboutConfig = (id = true, timestamp = true) => {
  let config = {
    information: Joi.string().trim().min(10).max(5000)
      .allow('')
      .required()
      .messages(informationMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const aboutSchema = (about, id = true, timestamps = true) => {
  const schema = Joi.object().keys(aboutConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(about);

  return { schemaError, data };
};

module.exports = {
  aboutSchema,
};
