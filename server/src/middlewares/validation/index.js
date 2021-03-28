const { dbIdSchema } = require('../../models');
const { CONFLICT } = require('../../helpers/constants/status-codes');

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
