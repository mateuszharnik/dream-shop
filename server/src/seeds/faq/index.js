const faqCategoriesSchema = require('../../api/v1/faq-categories/index.model');
const { faqCategories } = require('../data');
const { faqCategoriesDB, faqDB } = require('../../db');
const {
  faqsDeletedMessage,
  faqsCategoriesSeededMessage,
} = require('../../helpers/variables/tasks');

const seedFAQCategories = async () => {
  const categories = [];

  faqCategories.forEach((faqCategory) => {
    const { schemaError, data: category } = faqCategoriesSchema(faqCategory);

    if (schemaError) {
      // eslint-disable-next-line no-console
      return console.error(schemaError.details[0].message);
    }

    categories.push({
      category,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await faqDB.remove();
    await faqCategoriesDB.remove();
    await faqCategoriesDB.insert(categories);

    // eslint-disable-next-line no-console
    console.log(faqsDeletedMessage);
    // eslint-disable-next-line no-console
    console.log(faqsCategoriesSeededMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedFAQCategories;
