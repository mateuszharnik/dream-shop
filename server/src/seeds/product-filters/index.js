const { productFiltersDB } = require('../../db');
const { dbDeleteConstants } = require('../../helpers/constants');

const { PRODUCT_FILTERS_DELETED } = dbDeleteConstants;

const removeProductFilters = async () => {
  try {
    await productFiltersDB.remove();

    // eslint-disable-next-line no-console
    console.log(PRODUCT_FILTERS_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeProductFilters;
