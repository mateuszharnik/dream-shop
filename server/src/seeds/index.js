const colors = require('colors/safe');
const createDirectories = require('./directories');
const removeProductFilters = require('./product-filters');
const seedFAQCategories = require('./faq-categories');
const seedUsers = require('./users');
const { removeOrders } = require('./orders');
const { removeFAQs } = require('./faq');
const { removeNewsletterEmails } = require('./newsletter');
const { removeComments } = require('./comments');
const { removeProducts } = require('./products');
const { removeMessages } = require('./messages');
const { seedSocialMedia } = require('./social-media');
const { seedAbout } = require('./about');
const { seedContact } = require('./contact');
const { seedRegulations } = require('./regulations');
const { seedMap } = require('./map');
const { seedProductCategories } = require('./product-categories');

const seed = async () => {
  try {
    createDirectories();
    await removeNewsletterEmails();
    await removeFAQs();
    await removeMessages();
    await removeOrders();
    await removeProductFilters();
    await removeProducts();
    await removeComments();
    await seedUsers();
    await seedRegulations();
    await seedProductCategories();
    await seedFAQCategories();
    await seedSocialMedia();
    await seedMap();
    await seedContact();
    await seedAbout();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
