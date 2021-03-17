const { socialMedia } = require('../data');
const { dbSeedsConstants } = require('../../helpers/constants');
const { socialMediaSchema } = require('../../api/v1/social-media/index.model');
const { socialMediaDB } = require('../../db');

const { SOCIAL_MEDIA_SEEDED } = dbSeedsConstants;

const seedSocialMedia = async () => {
  const { schemaError, data } = socialMediaSchema(socialMedia);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
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
    console.log(SOCIAL_MEDIA_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedSocialMedia;
