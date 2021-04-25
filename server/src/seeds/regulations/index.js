const regulationsSchema = require('../../api/v1/regulations/index.model');
const { regulations } = require('../data');
const { regulationsDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');
const { REGULATIONS_SEEDED } = require('../../helpers/constants/tasks');

const seedRegulations = async () => {
  const regulationsArr = [];

  regulations.forEach((regulation) => {
    const { schemaError, data } = regulationsSchema(regulation);

    if (schemaError) {
      // eslint-disable-next-line no-console
      return console.error(schemaError.details[0].message);
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
    console.log(REGULATIONS_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedRegulations;
