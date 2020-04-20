const { map } = require('../data');
const { mapSchema } = require('../../api/v1/map/index.model');
const { mapDB } = require('../../db');

const seedMap = async () => {
  const { schemaError, data } = mapSchema(map, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await mapDB.remove({});
    await mapDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with map data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedMap;
