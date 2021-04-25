const Joi = require('joi');
const { TEN, FIVE_THOUSAND } = require('../../../helpers/constants/numbers');
const { dbIdRegExp } = require('../../../helpers/regexp');
const { contentMessages } = require('../../../helpers/errors/messages/comments');
const { idMessages } = require('../../../helpers/errors/messages/id');

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
      .min(TEN)
      .max(FIVE_THOUSAND)
      .required()
      .messages(contentMessages),
  });

  const { error: schemaError, value: data } = schema.validate(comment);

  return { schemaError, data };
};

module.exports = commentSchema;
