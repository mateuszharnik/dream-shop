const Joi = require('@hapi/joi');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { joiArrayConfigMessages, joiConfigMessages } = require('../../../helpers/errors/messages');
const { categoryMessages, titleMessages, contentMessages } = require('../../../helpers/errors/messages/faq');

const faqConfig = (id = true, timestamp = true) => {
  let config = {
    category: Joi.string().trim()
      .valid('zwroty', 'dostawa', 'płatności', 'obsługa', 'produkty', 'rabaty', 'inne')
      .required()
      .messages(categoryMessages),
    title: Joi.string().trim().min(10).max(1000)
      .required()
      .messages(titleMessages),
    content: Joi.string().trim().min(10).max(5000)
      .required()
      .messages(contentMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const faqCategoryConfig = (id = true, timestamp = true) => {
  let config = {
    category: Joi.string().trim()
      .valid('zwroty', 'dostawa', 'płatności', 'obsługa', 'produkty', 'rabaty', 'inne')
      .required()
      .messages(categoryMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return Joi.object().keys(config).required().messages(joiConfigMessages);
};

const faqCategoriesSchema = (faqCategories, id = true, timestamps = true) => {
  const schema = Joi.array().items(faqCategoryConfig(id, timestamps)).length(7)
    .required()
    .messages(joiArrayConfigMessages);

  const { error: schemaError, value: data } = schema.validate(faqCategories);

  return { schemaError, data };
};

const faqSchema = (faq, id = true, timestamps = true) => {
  const schema = Joi.object().keys(faqConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(faq);

  return { schemaError, data };
};

module.exports = {
  faqCategoriesSchema,
  faqSchema,
};
