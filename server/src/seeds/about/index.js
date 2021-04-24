const aboutSchema = require('../../api/v1/about/index.model');
const { about } = require('../data');
const { ABOUT_SEEDED } = require('../../helpers/constants/tasks');
const { aboutDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');

const seedAbout = async () => {
  const { schemaError, data } = aboutSchema(about);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  data.purify_information = purify(data.information);

  try {
    await aboutDB.remove();

    await aboutDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(ABOUT_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedAbout;
