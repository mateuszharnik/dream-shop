const { aboutSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { aboutDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');

const getAbout = async (req, res, next) => {
  try {
    const about = await aboutDB.findOne({});

    if (!about) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać informacji o sklepie');
    }

    res.status(200).json({ ...about });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateAbout = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  const { schemaError, data } = aboutSchema(req.body, true, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    data.information = purify(data.information);

    const about = await aboutDB.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!about) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować informacji o sklepie');
    }

    res.status(200).json({ ...about });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  updateAbout,
  getAbout,
};
