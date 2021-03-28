const { socialMediaSchema } = require('./index.model');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

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
