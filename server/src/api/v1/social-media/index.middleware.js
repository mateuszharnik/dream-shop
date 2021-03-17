const { socialMediaSchema } = require('./index.model');
const { statusCodesConstants } = require('../../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateSocialMedia = (req, res, next) => {
  const { schemaError, data: socialMedia } = socialMediaSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.socialMedia = socialMedia;

  next();
};

module.exports = {
  validateSocialMedia,
};
