const { productsDB } = require('../../db');

const removeProducts = async () => {
  try {
    await productsDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Deleted products from database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeProducts;
