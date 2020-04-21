const { faqCategories } = require('../data');
const { faqCategoriesSchema } = require('../../api/v1/faq/index.model');
const { faqCategoriesDB, faqDB } = require('../../db');

const seedFAQCategories = async () => {
  const { schemaError, data } = faqCategoriesSchema(faqCategories, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await faqDB.remove({});
    await faqCategoriesDB.remove({});
    await faqCategoriesDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Deleted faqs from database');
    // eslint-disable-next-line no-console
    console.log('Database seeded with faq categories data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedFAQCategories;
