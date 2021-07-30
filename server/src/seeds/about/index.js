const colors = require('colors/safe');
const aboutSchema = require('../../api/v1/about/index.model');
const { aboutSeededMessage } = require('../../helpers/variables/tasks');
const { aboutDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');
const { about, exampleAbout } = require('../../helpers/variables/about');

const seedAbout = async () => {
  const { schemaError, data } = aboutSchema(about);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(aboutSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleAbout = async () => {
  const { schemaError, data } = aboutSchema(exampleAbout);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(aboutSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedAbout,
  seedExampleAbout,
};
