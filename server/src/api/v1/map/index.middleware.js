const { mapSchema } = require('./index.model');
const { statusCodesConstants } = require('../../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateMap = (req, res, next) => {
  const { schemaError, data: map } = mapSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.map = map;

  next();
};

module.exports = {
  validateMap,
};
