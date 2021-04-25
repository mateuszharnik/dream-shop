const { productsDB } = require('../../db');
const { PRODUCTS_DELETED } = require('../../helpers/constants/tasks');

const removeProducts = async () => {
  try {
    await productsDB.remove();

    // eslint-disable-next-line no-console
    console.log(PRODUCTS_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeProducts;
