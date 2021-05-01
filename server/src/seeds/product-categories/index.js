const productCategorySchema = require('../../api/v1/product-categories/index.model');
const convertCategory = require('../../helpers/product-categories');
const { productCategories } = require('../data');
const { productCategoriesDB } = require('../../db');
const {
  PRODUCT_CATEGORIES_DELETED, PRODUCT_CATEGORIES_SEEDED,
} = require('../../helpers/constants/tasks');

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
      return console.error(schemaError.details[0].message);
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
    console.log(PRODUCT_CATEGORIES_DELETED);
    // eslint-disable-next-line no-console
    console.log(PRODUCT_CATEGORIES_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedProductCategories;
