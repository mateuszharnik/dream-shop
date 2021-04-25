const productCategorySchema = require('./index.model');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateProductCategory = (req, res, next) => {
  const { schemaError, data: productCategory } = productCategorySchema(
    req.body,
  );

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.productCategory = productCategory;

  next();
};

module.exports = {
  validateProductCategory,
};
