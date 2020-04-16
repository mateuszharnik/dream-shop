const { updateSocialMediaSchema } = require('./index.model');
const { responseWithError, checkSocialMediaErrors } = require('../../../helpers/errors');
const { socialMediaDB } = require('../../../db');

const getSocialMedia = async (req, res, next) => {
  try {
    const socialMedia = await socialMediaDB.findOne({});

    if (!socialMedia) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać linków do mediów społecznościowych');
    }

    res.status(200).json({ ...socialMedia });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateSocialMedia = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  const { error: schemaError, value: data } = updateSocialMediaSchema.validate(req.body);

  if (schemaError) {
    return checkSocialMediaErrors(schemaError, res, next);
  }

  try {
    const socialMedia = await socialMediaDB.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!socialMedia) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować linków do mediów społecznościowych');
    }

    res.status(200).json({ ...socialMedia });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getSocialMedia,
  updateSocialMedia,
};