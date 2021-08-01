const colors = require('colors/safe');
const { productFiltersDB } = require('../../db');
const {
  productFiltersDeletedMessage,
} = require('../../helpers/variables/tasks');

const removeProductFilters = async () => {
  try {
    await productFiltersDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(productFiltersDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = removeProductFilters;
