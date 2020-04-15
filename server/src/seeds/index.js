const seedUsers = require('./users');

const seed = async () => {
  try {
    await seedUsers();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

seed();
