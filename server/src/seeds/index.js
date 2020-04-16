const seedUsers = require('./users');
const seedSocialMedia = require('./social-media');

const seed = async () => {
  try {
    await seedUsers();
    await seedSocialMedia();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seed();
