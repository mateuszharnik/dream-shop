const orderSchema = require('./index.model');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateOrder = (req, res, next) => {
  const { schemaError, data: order } = orderSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.order = order;

  next();
};

module.exports = {
  validateOrder,
};
