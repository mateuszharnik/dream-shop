const seedUsers = require('./users');
const seedSocialMedia = require('./social-media');
const seedContact = require('./contact');

const seed = async () => {
  try {
    await seedUsers();
    await seedSocialMedia();
    await seedContact();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seed();
