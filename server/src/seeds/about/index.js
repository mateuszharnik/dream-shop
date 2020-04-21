const { about } = require('../data');
const { aboutSchema } = require('../../api/v1/about/index.model');
const { aboutDB } = require('../../db');

const seedAbout = async () => {
  const { schemaError, data } = aboutSchema(about, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await aboutDB.remove({});
    await aboutDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with about data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedAbout;
