const { productFiltersDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');

const getProductFilters = async (req, res, next) => {
  const { category = '' } = req.query;

  const query = {
    deleted_at: null,
  };

  if (category) {
    query.category = category;
  }

  try {
    const filters = await productFiltersDB.find(
      query,
      { sort: { created_at: -1 } },
    );

    if (!filters) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać filtrów produktów.');
    }

    res.status(200).json(filters);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = { getProductFilters };
