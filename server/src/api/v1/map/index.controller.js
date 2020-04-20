const { mapDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');
const { mapSchema } = require('./index.model');

const getMap = async (req, res, next) => {
  try {
    const map = await mapDB.findOne({});

    if (!map) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać danych dla mapy');
    }

    res.status(200).json({ ...map });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateMap = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  const { schemaError, data } = mapSchema(req.body, true, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const map = await mapDB.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!map) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować koordynatów mapy');
    }

    res.status(200).json({ ...map });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  updateMap,
  getMap,
};
