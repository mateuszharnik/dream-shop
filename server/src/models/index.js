const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../helpers/errors/messages');
const { mimetypeMessages, pathMessages, sizeMessages } = require('../helpers/errors/messages/file');
const { mimetypeRegExp, avatarPathRegExp, thumbnailPathRegExp } = require('../helpers/regexp');
const { avatarMaxSize, thumbnailMaxSize } = require('../helpers/files');
const { _id } = require('../helpers/schemas/index');

const dbIdSchema = (id) => {
  const schema = Joi.object().keys({ id: _id }).required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(id);

  return { schemaError, data };
};

const avatarFileConfig = {
  mimetype: Joi.string().trim().regex(mimetypeRegExp).required()
    .messages(mimetypeMessages),
  size: Joi.number().max(avatarMaxSize).required()
    .messages(sizeMessages),
  path: Joi.string().trim().regex(avatarPathRegExp).required()
    .messages(pathMessages),
};

const avatarFileSchema = (file) => {
  const schema = Joi.object().keys(avatarFileConfig).unknown(true)
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

const thumbnailFileConfig = {
  mimetype: Joi.string().trim().regex(mimetypeRegExp).required()
    .messages(mimetypeMessages),
  size: Joi.number().max(thumbnailMaxSize).required()
    .messages(sizeMessages),
  path: Joi.string().trim().regex(thumbnailPathRegExp).required()
    .messages(pathMessages),
};

const thumbnailFileSchema = (file) => {
  const schema = Joi.object().keys(thumbnailFileConfig).unknown(true)
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

module.exports = {
  dbIdSchema,
  avatarFileSchema,
  thumbnailFileSchema,
};
