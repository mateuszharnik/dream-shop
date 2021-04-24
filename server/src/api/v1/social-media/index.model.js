const Joi = require('joi');
const {
  facebookMessages,
  twitterMessages,
  linkedinMessages,
  instagramMessages,
} = require('../../../helpers/errors/messages/social-media');
const {
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
} = require('../../../helpers/regexp');

const socialMediaSchema = (socialMedia) => {
  const schema = Joi.object().keys({
    facebook: Joi.string()
      .trim()
      .regex(facebookRegExp)
      .allow('')
      .required()
      .messages(facebookMessages),
    twitter: Joi.string()
      .trim()
      .regex(twitterRegExp)
      .allow('')
      .required()
      .messages(twitterMessages),
    linkedin: Joi.string()
      .trim()
      .regex(linkedinRegExp)
      .allow('')
      .required()
      .messages(linkedinMessages),
    instagram: Joi.string()
      .trim()
      .regex(instagramRegExp)
      .allow('')
      .required()
      .messages(instagramMessages),
  });

  const { error: schemaError, value: data } = schema.validate(socialMedia);

  return { schemaError, data };
};

module.exports = socialMediaSchema;
