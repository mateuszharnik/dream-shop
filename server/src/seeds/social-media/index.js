const socialMediaSchema = require('../../api/v1/social-media/index.model');
const { socialMedia } = require('../data');
const { socialMediaSeededMessage } = require('../../helpers/variables/tasks');
const { socialMediaDB } = require('../../db');

const seedSocialMedia = async () => {
  const { schemaError, data } = socialMediaSchema(socialMedia);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError.details[0].message);
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
    console.log(socialMediaSeededMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedSocialMedia;
