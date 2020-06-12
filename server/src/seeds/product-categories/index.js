const { productCategories } = require('../data');
const { productCategoriesSchema } = require('../../api/v1/product-categories/index.model');
const { productCategoriesDB } = require('../../db');
const { addCategory } = require('../../helpers/product-categories');

const seedProductCategories = async () => {
  const newProductCategories = productCategories.map((product) => {
    const newProduct = { ...product };
    if (newProduct.name && typeof newProduct.name === 'string') {
      newProduct.category = addCategory(product.name);
    }
    return newProduct;
  });

  const { schemaError, data } = productCategoriesSchema(newProductCategories, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    const updatedProductCategories = data.map((category) => {
      const updatedCategory = { ...category, count: 0 };
      return updatedCategory;
    });

    await productCategoriesDB.remove({});
    await productCategoriesDB.insert(updatedProductCategories);

    // eslint-disable-next-line no-console
    console.log('Database seeded with product categories data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedProductCategories;
