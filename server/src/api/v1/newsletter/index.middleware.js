const newsletterSchema = require('./index.model');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

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
