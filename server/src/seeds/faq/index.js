const { faqCategories } = require('../data');
const {
  faqCategoriesSchema,
} = require('../../api/v1/faq-categories/index.model');
const { faqCategoriesDB, faqDB } = require('../../db');
const {
  FAQS_DELETED,
  FAQS_CATEGORIES_SEEDED,
} = require('../../helpers/constants/tasks');

const seedFAQCategories = async () => {
  const categories = [];

  faqCategories.forEach((faqCategory) => {
    const { schemaError, data: category } = faqCategoriesSchema(faqCategory);

    if (schemaError) {
      // eslint-disable-next-line no-console
      return console.error(schemaError);
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
    console.log(FAQS_DELETED);
    // eslint-disable-next-line no-console
    console.log(FAQS_CATEGORIES_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedFAQCategories;
