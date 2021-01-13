const { productFiltersDB } = require('../../db');

const seedProductFilters = async () => {
  try {
    await productFiltersDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Database seeded with product filters data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedProductFilters;
