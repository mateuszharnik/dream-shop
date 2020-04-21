const { socialMediaSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
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
  const { schemaError, data } = socialMediaSchema(req.body, true, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
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
