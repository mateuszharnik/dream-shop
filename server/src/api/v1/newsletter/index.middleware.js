const { newsletterSchema } = require('./index.model');
const { statusCodesConstants } = require('../../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateNewsletter = (req, res, next) => {
  const { schemaError, data: email } = newsletterSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.email = email;

  next();
};

module.exports = {
  validateNewsletter,
};
