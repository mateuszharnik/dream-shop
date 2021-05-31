const { productFiltersDB } = require('../../db');
const { productFiltersDeletedMessage } = require('../../helpers/variables/tasks');

const removeProductFilters = async () => {
  try {
    await productFiltersDB.remove();

    // eslint-disable-next-line no-console
    console.log(productFiltersDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeProductFilters;
