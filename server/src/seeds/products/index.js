const { productsDB } = require('../../db');
const { productsDeletedMessage } = require('../../helpers/variables/tasks');

const removeProducts = async () => {
  try {
    await productsDB.remove();

    // eslint-disable-next-line no-console
    console.log(productsDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeProducts;
