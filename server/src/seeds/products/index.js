const colors = require('colors/safe');
const productSchema = require('../../api/v1/products/index.model');
const convertCategory = require('../../helpers/product-categories');
const { productsDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');
const { createProducts } = require('../../helpers/products');
const {
  productsDeletedMessage,
  productsSeededMessage,
} = require('../../helpers/variables/tasks');

const removeProducts = async () => {
  try {
    await productsDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(productsDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleProducts = async () => {
  const products = [];
  const createdProducts = await createProducts();

  createdProducts.forEach((product) => {
    const newProduct = { ...product };
    newProduct.category = convertCategory(newProduct.category_name);

    const { schemaError, data } = productSchema(newProduct);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    data.purify_description = purify(data.description);

    products.push({
      ...data,
      selled: 0,
      views: Math.floor(Math.random() * 100),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });
  try {
    await productsDB.remove();
    await productsDB.insert(products);

    // eslint-disable-next-line no-console
    console.log(colors.green(productsSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeProducts,
  seedExampleProducts,
};
