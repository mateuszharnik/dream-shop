const colors = require('colors/safe');
const productCategorySchema = require('../../api/v1/product-categories/index.model');
const convertCategory = require('../../helpers/product-categories');
const { productCategoriesDB, productsDB } = require('../../db');
const { productCategoriesSeededMessage } = require('../../helpers/variables/tasks');
const { productCategories, exampleProductCategories } = require('../../helpers/variables/product-categories');

const seedProductCategories = async () => {
  const categories = [];

  productCategories.forEach((productCategory) => {
    const category = { ...productCategory };

    if (category.name && typeof category.name === 'string') {
      category.category = convertCategory(category.name);
    }

    const { schemaError, data } = productCategorySchema(category);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    categories.push({
      ...data,
      count: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await productCategoriesDB.remove();
    await productCategoriesDB.insert(categories);

    // eslint-disable-next-line no-console
    console.log(colors.green(productCategoriesSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleProductCategories = async () => {
  const categories = [];

  exampleProductCategories.forEach(async (productCategory) => {
    const category = { ...productCategory };

    if (category.name && typeof category.name === 'string') {
      category.category = convertCategory(category.name);
    }

    const { schemaError, data } = productCategorySchema(category);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    const count = await productsDB.count({ category: data.category });

    categories.push({
      ...data,
      count,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await productCategoriesDB.remove();
    await productCategoriesDB.insert(categories);

    // eslint-disable-next-line no-console
    console.log(colors.green(productCategoriesSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedProductCategories,
  seedExampleProductCategories,
};
