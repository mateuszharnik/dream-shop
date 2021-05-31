const Joi = require('joi');
const { dbIdRegExp } = require('../../../helpers/regexp');
const { idMessages } = require('../../../helpers/errors/messages/id');
const {
  contentMessages,
} = require('../../../helpers/errors/messages/comments');
const {
  contentMinLenght,
  contentMaxLenght,
} = require('../../../helpers/variables/comments');

const commentSchema = (comment) => {
  const schema = Joi.object().keys({
    user_id: Joi.string()
      .trim()
      .allow('')
      .regex(dbIdRegExp)
      .messages(idMessages)
      .required(),
    product_id: Joi.string()
      .trim()
      .regex(dbIdRegExp)
      .required()
      .messages(idMessages),
    content: Joi.string()
      .trim()
      .min(contentMinLenght)
      .max(contentMaxLenght)
      .required()
      .messages(contentMessages),
  });

  const { error: schemaError, value: data } = schema.validate(comment);

  return { schemaError, data };
};

module.exports = commentSchema;
