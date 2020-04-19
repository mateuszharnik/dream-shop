const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const {
  facebookMessages, twitterMessages, linkedinMessages, instagramMessages,
} = require('../../../helpers/errors/messages/social-media');
const {
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
} = require('../../../helpers/regexp');

const socialMediaConfig = (id = true, timestamps = true) => {
  let config = {
    facebook: Joi.string().trim().regex(facebookRegExp).allow('')
      .required()
      .messages(facebookMessages),
    twitter: Joi.string().trim().regex(twitterRegExp).allow('')
      .required()
      .messages(twitterMessages),
    linkedin: Joi.string().trim().regex(linkedinRegExp).allow('')
      .required()
      .messages(linkedinMessages),
    instagram: Joi.string().trim().regex(instagramRegExp).allow('')
      .required()
      .messages(instagramMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const socialMediaSchema = (socialMedia, id = true, timestamps = true) => {
  const schema = Joi.object().keys(socialMediaConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(socialMedia);

  return { schemaError, data };
};

module.exports = {
  socialMediaSchema,
};
