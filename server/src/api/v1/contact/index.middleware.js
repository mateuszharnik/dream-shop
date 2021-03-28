const { contactSchema } = require('./index.model');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateContact = (req, res, next) => {
  const { schemaError, data: contact } = contactSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.contact = contact;

  next();
};

module.exports = {
  validateContact,
};
