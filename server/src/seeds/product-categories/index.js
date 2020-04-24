const { productCategories } = require('../data');
const { productCategoriesSchema } = require('../../api/v1/product-categories/index.model');
const { productCategoriesDB } = require('../../db');
const { addCategory } = require('../../helpers/product-categories');

const seedProductCategories = async () => {
  const newProductCategories = productCategories.map((product) => {
    const newProduct = { ...product };
    newProduct.category = addCategory(product);
    return newProduct;
  });

  const { schemaError, data } = productCategoriesSchema(newProductCategories, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await productCategoriesDB.remove({});
    await productCategoriesDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with product categories data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedProductCategories;
