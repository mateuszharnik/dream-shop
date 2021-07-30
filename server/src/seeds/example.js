const colors = require('colors/safe');
const createDirectories = require('./directories');
const removeProductFilters = require('./product-filters');
const seedFAQCategories = require('./faq-categories');
const seedUsers = require('./users');
const { seedExampleOrders } = require('./orders');
const { seedExampleSocialMedia } = require('./social-media');
const { seedExampleAbout } = require('./about');
const { seedExampleFAQs } = require('./faq');
const { seedExampleContact } = require('./contact');
const { seedExampleRegulations } = require('./regulations');
const { seedExampleMap } = require('./map');
const { seedExampleProductCategories } = require('./product-categories');
const { seedExampleNewsletterEmails } = require('./newsletter');
const { seedExampleComments } = require('./comments');
const { seedExampleProducts } = require('./products');
const { seedExampleMessages } = require('./messages');

const seed = async () => {
  try {
    createDirectories();
    await removeProductFilters();
    await seedUsers();
    await seedFAQCategories();
    await seedExampleFAQs();
    await seedExampleNewsletterEmails();
    await seedExampleMessages();
    await seedExampleProducts();
    await seedExampleComments();
    await seedExampleOrders();
    await seedExampleRegulations();
    await seedExampleProductCategories();
    await seedExampleSocialMedia();
    await seedExampleMap();
    await seedExampleContact();
    await seedExampleAbout();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
