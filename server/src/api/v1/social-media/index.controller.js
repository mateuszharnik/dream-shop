const { socialMediaDB } = require('../../../db');
const {
  SOCIAL_MEDIA_NOT_FOUND,
  SOCIAL_MEDIA_NOT_UPDATED,
} = require('../../../helpers/constants/social-media');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getSocialMedia = async (req, res) => {
  try {
    const socialMedia = await socialMediaDB.findOne({ deleted_at: null });

    if (!socialMedia) {
      return req.data.responseWithError(NOT_FOUND, SOCIAL_MEDIA_NOT_FOUND);
    }

    res.status(OK).json(socialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateSocialMedia = async (req, res) => {
  try {
    const socialMedia = await socialMediaDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!socialMedia) {
      return req.data.responseWithError(NOT_FOUND, SOCIAL_MEDIA_NOT_FOUND);
    }

    const updatedSocialMedia = await socialMediaDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.socialMedia,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedSocialMedia) {
      return req.data.responseWithError(CONFLICT, SOCIAL_MEDIA_NOT_UPDATED);
    }

    res.status(OK).json(updatedSocialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getSocialMedia,
  updateSocialMedia,
};
