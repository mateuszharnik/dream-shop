const colors = require('colors/safe');
const regulationsSchema = require('../../api/v1/regulations/index.model');
const { regulationsDB } = require('../../db');
const { regulationsSeededMessage } = require('../../helpers/variables/tasks');
const { purify } = require('../../helpers/sanitize');
const { regulations, exampleRegulations } = require('../../helpers/variables/regulations');

const seedRegulations = async () => {
  const regulationsArr = [];

  regulations.forEach((regulation) => {
    const { schemaError, data } = regulationsSchema(regulation);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    data.purify_content = purify(data.content);

    regulationsArr.push({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await regulationsDB.remove();
    await regulationsDB.insert(regulationsArr);

    // eslint-disable-next-line no-console
    console.log(colors.green(regulationsSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleRegulations = async () => {
  const regulationsArr = [];

  exampleRegulations.forEach((regulation) => {
    const { schemaError, data } = regulationsSchema(regulation);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    data.purify_content = purify(data.content);

    regulationsArr.push({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await regulationsDB.remove();
    await regulationsDB.insert(regulationsArr);

    // eslint-disable-next-line no-console
    console.log(colors.green(regulationsSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedRegulations,
  seedExampleRegulations,
};
