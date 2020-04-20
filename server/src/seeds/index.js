const seedUsers = require('./users');
const seedSocialMedia = require('./social-media');
const seedContact = require('./contact');
const seedMap = require('./map');
const removeNewsletterEmails = require('./newsletter');

const seed = async () => {
  try {
    await removeNewsletterEmails();
    await seedUsers();
    await seedSocialMedia();
    await seedMap();
    await seedContact();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seed();
