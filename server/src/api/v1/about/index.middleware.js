const { aboutSchema } = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const { statusCodesConstants } = require('../../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateAbout = (req, res, next) => {
  const { schemaError, data: about } = aboutSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  about.purify_information = purify(about.information);

  req.data.about = about;

  next();
};

module.exports = {
  validateAbout,
};
