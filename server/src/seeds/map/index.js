const colors = require('colors/safe');
const mapSchema = require('../../api/v1/map/index.model');
const { mapSeededMessage } = require('../../helpers/variables/tasks');
const { mapDB } = require('../../db');
const { map, exampleMap } = require('../../helpers/variables/map');

const seedMap = async () => {
  const { schemaError, data } = mapSchema(map);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(mapSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleMap = async () => {
  const { schemaError, data } = mapSchema(exampleMap);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(mapSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedMap,
  seedExampleMap,
};
