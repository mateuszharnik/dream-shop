const { regulationsSchema } = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const { statusCodesConstants } = require('../../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateRegulation = (req, res, next) => {
  const { schemaError, data: regulation } = regulationsSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  regulation.purify_content = purify(regulation.content);

  req.data.regulation = regulation;

  next();
};

module.exports = {
  validateRegulation,
};
