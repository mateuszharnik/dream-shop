const createDirectories = require('./directories');
const seedUsers = require('./users');
const seedSocialMedia = require('./social-media');
const seedAbout = require('./about');
const seedFAQCategories = require('./faq');
const seedContact = require('./contact');
const seedRegulations = require('./regulations');
const seedMap = require('./map');
const seedProductCategories = require('./product-categories');
const seedProductFilters = require('./product-filters');
const removeNewsletterEmails = require('./newsletter');
const removeComments = require('./comments');
const removeProducts = require('./products');
const removeMessages = require('./messages');
const removeOrders = require('./orders');

const seed = async () => {
  try {
    createDirectories();
    await removeNewsletterEmails();
    await removeMessages();
    await removeOrders();
    await removeProducts();
    await removeComments();
    await seedRegulations();
    await seedProductCategories();
    await seedProductFilters();
    await seedFAQCategories();
    await seedUsers();
    await seedSocialMedia();
    await seedMap();
    await seedContact();
    await seedAbout();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seed();
