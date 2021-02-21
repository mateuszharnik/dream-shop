const Joi = require('@hapi/joi');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { dbIdRegExp, avatarRegExp } = require('../../../helpers/regexp');
const { joiConfigMessages } = require('../../../helpers/errors/messages');

const commentConfig = (id = true, timestamp = true) => {
  let config = {
    author: Joi.string().min(3).max(50).trim()
      .required(),
    product_id: Joi.string().trim().regex(dbIdRegExp).required(),
    content: Joi.string().trim().min(10).max(5000)
      .required(),
    author_image: Joi.string().trim().regex(avatarRegExp).required(),
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
