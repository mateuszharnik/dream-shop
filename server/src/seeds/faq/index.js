const colors = require('colors/safe');
const faqSchema = require('../../api/v1/faq/index.model');
const { purify } = require('../../helpers/sanitize');
const { faqDB } = require('../../db');
const { defaultContent: content } = require('../../helpers/variables/faq');
const {
  faqsDeletedMessage,
  faqsSeededMessage,
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

const createFAQs = () => {
  const faqs = [];

  for (let i = 0; i < 100; i += 1) {
    faqs.push({
      category: faqCategories[i % faqCategories.length],
      title: `Tytuł numer ${i + 1}`,
      content,
    });
  }

  return faqs;
};

const removeFAQs = async () => {
  try {
    await faqDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(faqsDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleFAQs = async () => {
  const faqs = [];

  createFAQs().forEach((faq) => {
    const { schemaError, data } = faqSchema(faq);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    data.purify_content = purify(data.content);

    faqs.push({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await faqDB.remove();
    await faqDB.insert(faqs);

    // eslint-disable-next-line no-console
    console.log(colors.green(faqsSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeFAQs,
  seedExampleFAQs,
};
