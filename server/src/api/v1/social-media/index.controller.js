const { socialMediaDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  socialMediaNotFoundMessage,
  socialMediaNotUpdatedMessage,
} = require('../../../helpers/variables/social-media');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const getSocialMedia = async (req, res) => {
  try {
    const socialMedia = await socialMediaDB.findOne({ deleted_at: null });

    if (!socialMedia) {
      return req.data.responseWithError(NOT_FOUND, socialMediaNotFoundMessage);
    }

    res.status(OK).json(socialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateSocialMedia = async (req, res) => {
  try {
    const socialMedia = await socialMediaDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!socialMedia) {
      return req.data.responseWithError(NOT_FOUND, socialMediaNotFoundMessage);
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
      return req.data.responseWithError(CONFLICT, socialMediaNotUpdatedMessage);
    }

    res.status(OK).json(updatedSocialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  getSocialMedia,
  updateSocialMedia,
};
