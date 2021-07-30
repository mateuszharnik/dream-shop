const colors = require('colors/safe');
const faqCategoriesSchema = require('../../api/v1/faq-categories/index.model');
const { faqCategoriesDB } = require('../../db');
const {
  faqsCategoriesSeededMessage,
} = require('../../helpers/variables/tasks');
const {
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
} = require('../../helpers/variables/constants/faq');

const faqCategories = [
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
];

const seedFAQCategories = async () => {
  const categories = [];

  faqCategories.forEach((faqCategory) => {
    const { schemaError, data: category } = faqCategoriesSchema(faqCategory);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    categories.push({
      category,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await faqCategoriesDB.remove();
    await faqCategoriesDB.insert(categories);

    // eslint-disable-next-line no-console
    console.log(colors.green(faqsCategoriesSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = seedFAQCategories;
