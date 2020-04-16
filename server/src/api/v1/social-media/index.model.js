const Joi = require('@hapi/joi');
const {
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
  dbIdRegExp,
} = require('../../../helpers/regexp');

const socialMediaSchema = Joi.object().keys({
  facebook: Joi.string().trim().regex(facebookRegExp).allow('')
    .required(),
  twitter: Joi.string().trim().regex(twitterRegExp).allow('')
    .required(),
  linkedin: Joi.string().trim().regex(linkedinRegExp).allow('')
    .required(),
  instagram: Joi.string().trim().regex(instagramRegExp).allow('')
    .required(),
  created_at: Joi.date().required(),
  updated_at: Joi.date().required(),
  deleted_at: Joi.date().allow(null).required(),
});

const updateSocialMediaSchema = Joi.object().keys({
  _id: Joi.string().trim().regex(dbIdRegExp).required(),
  facebook: Joi.string().trim().regex(facebookRegExp).allow('')
    .required(),
  twitter: Joi.string().trim().regex(twitterRegExp).allow('')
    .required(),
  linkedin: Joi.string().trim().regex(linkedinRegExp).allow('')
    .required(),
  instagram: Joi.string().trim().regex(instagramRegExp).allow('')
    .required(),
  created_at: Joi.date().required(),
  updated_at: Joi.date().required(),
  deleted_at: Joi.date().allow(null).required(),
});

module.exports = { socialMediaSchema, updateSocialMediaSchema };
