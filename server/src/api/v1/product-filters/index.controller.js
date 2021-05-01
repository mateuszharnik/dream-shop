const { productFiltersDB } = require('../../../db');
const { FILTERS_NOT_FOUND } = require('../../../helpers/constants/product-filters');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getProductFilters = async (req, res) => {
  const { category = '' } = req.query;

  const query = {
    deleted_at: null,
  };

  if (category) {
    query.category = category;
  }

  try {
    const filters = await productFiltersDB.find(query, {
      sort: { created_at: -1 },
    });

    if (!filters) {
      return req.data.responseWithError(NOT_FOUND, FILTERS_NOT_FOUND);
    }

    res.status(OK).json(filters);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = { getProductFilters };
