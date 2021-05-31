const mapSchema = require('../../api/v1/map/index.model');
const { map } = require('../data');
const { mapSeededMessage } = require('../../helpers/variables/tasks');
const { mapDB } = require('../../db');

const seedMap = async () => {
  const { schemaError, data } = mapSchema(map);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError.details[0].message);
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
    console.log(mapSeededMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedMap;
