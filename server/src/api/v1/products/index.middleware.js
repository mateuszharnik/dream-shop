const productSchema = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateProduct = (req, res, next) => {
  const { schemaError, data: product } = productSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  product.purify_description = purify(product.description);

  req.data.product = product;

  next();
};

module.exports = {
  validateProduct,
};
