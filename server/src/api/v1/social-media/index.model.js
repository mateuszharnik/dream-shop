const Joi = require('@hapi/joi');
const { joiConfigObject } = require('../../../helpers/errors/messages');
const { timestamps, _id } = require('../../../helpers/schemas');
const {
  facebookMessages, twitterMessages, linkedinMessages, instagramMessages,
} = require('../../../helpers/errors/messages/social-media');
const {
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
} = require('../../../helpers/regexp');

const socialMediaConfig = {
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
  ...timestamps,
};

const socialMediaSchema = (socialMedia, withId = true) => {
  const schema = Joi.object().keys(withId ? {
    _id,
    ...socialMediaConfig,
  } : socialMediaConfig).messages(joiConfigObject);

  const { error: schemaError, value: data } = schema.validate(socialMedia);

  return { schemaError, data };
};

module.exports = {
  socialMediaSchema,
};
