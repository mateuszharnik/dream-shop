const { dbIdSchema } = require('../../models');
const { statusCodesConstants } = require('../../helpers/constants');

const { CONFLICT } = statusCodesConstants;

const validateDBId = (req, res, next) => {
  const { schemaError, data: params } = dbIdSchema(req.params);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.params = params;

  next();
};

module.exports = {
  validateDBId,
};
