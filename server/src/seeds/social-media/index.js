const colors = require('colors/safe');
const socialMediaSchema = require('../../api/v1/social-media/index.model');
const { socialMediaSeededMessage } = require('../../helpers/variables/tasks');
const { socialMediaDB } = require('../../db');
const { socialMedia, exampleSocialMedia } = require('../../helpers/variables/social-media');

const seedSocialMedia = async () => {
  const { schemaError, data } = socialMediaSchema(socialMedia);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
  }

  try {
    await socialMediaDB.remove();
    await socialMediaDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(colors.green(socialMediaSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleSocialMedia = async () => {
  const { schemaError, data } = socialMediaSchema(exampleSocialMedia);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
  }

  try {
    await socialMediaDB.remove();
    await socialMediaDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(colors.green(socialMediaSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedSocialMedia,
  seedExampleSocialMedia,
};
