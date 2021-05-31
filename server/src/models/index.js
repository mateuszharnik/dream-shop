const Joi = require('joi');
const { idMessages } = require('../helpers/errors/messages/id');
const {
  mimetypeMessages,
  pathMessages,
  sizeMessages,
} = require('../helpers/errors/messages/file');
const {
  mimetypeRegExp,
  avatarPathRegExp,
  thumbnailPathRegExp,
  dbIdRegExp,
} = require('../helpers/regexp');
const {
  AVATAR_MAX_SIZE,
  THUMBNAIL_MAX_SIZE,
} = require('../helpers/variables/constants/files');

const dbIdSchema = (id) => {
  const schema = Joi.object()
    .keys({
      id: Joi.string().trim().regex(dbIdRegExp).required()
        .messages(idMessages),
    });

  const { error: schemaError, value: data } = schema.validate(id);

  return { schemaError, data };
};

const avatarFileSchema = (file) => {
  const schema = Joi.object()
    .keys({
      mimetype: Joi.string()
        .trim()
        .regex(mimetypeRegExp)
        .required()
        .messages(mimetypeMessages),
      size: Joi.number().max(AVATAR_MAX_SIZE).required().messages(sizeMessages),
      path: Joi.string()
        .trim()
        .regex(avatarPathRegExp)
        .required()
        .messages(pathMessages),
    })
    .unknown(true);

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

const thumbnailFileSchema = (file) => {
  const schema = Joi.object()
    .keys({
      mimetype: Joi.string()
        .trim()
        .regex(mimetypeRegExp)
        .required()
        .messages(mimetypeMessages),
      size: Joi.number()
        .max(THUMBNAIL_MAX_SIZE)
        .required()
        .messages(sizeMessages),
      path: Joi.string()
        .trim()
        .regex(thumbnailPathRegExp)
        .required()
        .messages(pathMessages),
    })
    .unknown(true);

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

const galleryFileSchema = (file) => {
  const schema = Joi.array()
    .items(
      Joi.object()
        .keys({
          mimetype: Joi.string()
            .trim()
            .regex(mimetypeRegExp)
            .required()
            .messages(mimetypeMessages),
          size: Joi.number()
            .max(THUMBNAIL_MAX_SIZE)
            .required()
            .messages(sizeMessages),
          path: Joi.string()
            .trim()
            .regex(thumbnailPathRegExp)
            .required()
            .messages(pathMessages),
        })
        .unknown(true),
    )
    .required();

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

module.exports = {
  dbIdSchema,
  avatarFileSchema,
  thumbnailFileSchema,
  galleryFileSchema,
};
