const Joi = require('joi');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { dbIdRegExp } = require('../../../helpers/regexp');
const { joiConfigMessages } = require('../../../helpers/errors/messages');

const commentConfig = (id = true, timestamp = true) => {
  let config = {
    user_id: Joi.string().trim().allow('').regex(dbIdRegExp)
      .required(),
    product_id: Joi.string().trim().regex(dbIdRegExp).required(),
    content: Joi.string().trim().min(10).max(5000)
      .required(),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const commentSchema = (comment, id = true, timestamps = true) => {
  const schema = Joi.object()
    .keys(commentConfig(id, timestamps))
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(comment);

  return { schemaError, data };
};

module.exports = {
  commentSchema,
};
