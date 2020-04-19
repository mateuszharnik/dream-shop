const { socialMedia } = require('../data');
const { socialMediaSchema } = require('../../api/v1/social-media/index.model');
const { socialMediaDB } = require('../../db');

const seedSocialMedia = async () => {
  const { schemaError, data } = socialMediaSchema(socialMedia, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await socialMediaDB.remove({});
    await socialMediaDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with social media data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedSocialMedia;
