const { map } = require('../data');
const { MAP_SEEDED } = require('../../helpers/constants/tasks');
const { mapSchema } = require('../../api/v1/map/index.model');
const { mapDB } = require('../../db');

const seedMap = async () => {
  const { schemaError, data } = mapSchema(map);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await mapDB.remove();

    await mapDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(MAP_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedMap;
