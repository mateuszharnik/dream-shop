const Joi = require('@hapi/joi');
const { idMessages } = require('../errors/messages/id');
const { deletedAtMessages, updatedAtMessages, createdAtMessages } = require('../errors/messages/timestamp');
const { dbIdRegExp } = require('../regexp');

const _id = Joi.string().trim().regex(dbIdRegExp).required()
  .messages(idMessages);

const timestamps = {
  created_at: Joi.date().required().messages(createdAtMessages),
  updated_at: Joi.date().required().messages(updatedAtMessages),
  deleted_at: Joi.date().allow(null).required().messages(deletedAtMessages),
};

const addId = (config) => ({
  _id,
  ...config,
});

const addTimestamps = (config) => ({
  ...config,
  ...timestamps,
});

module.exports = {
  _id,
  timestamps,
  addId,
  addTimestamps,
};
