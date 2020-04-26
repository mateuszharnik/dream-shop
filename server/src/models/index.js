const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../helpers/errors/messages');
const { _id } = require('../helpers/schemas/index');

const dbIdSchema = (id) => {
  const schema = Joi.object().keys({ id: _id }).required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(id);

  return { schemaError, data };
};

module.exports = {
  dbIdSchema,
};
