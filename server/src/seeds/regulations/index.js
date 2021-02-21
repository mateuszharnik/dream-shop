const { regulations } = require('../data');
const { regulationsSchema } = require('../../api/v1/regulations/index.model');
const { regulationsDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');

const seedRegulations = async () => {
  const regulationsArr = [];

  regulations.forEach((value) => {
    const { schemaError, data } = regulationsSchema(value, false, true, true);

    if (schemaError) {
      // eslint-disable-next-line no-console
      return console.error(schemaError);
    }

    data.purify_content = purify(data.content);

    regulationsArr.push(data);
  });

  try {
    await regulationsDB.remove({});
    await regulationsDB.insert(regulationsArr);

    // eslint-disable-next-line no-console
    console.log('Database seeded with regulations data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedRegulations;
