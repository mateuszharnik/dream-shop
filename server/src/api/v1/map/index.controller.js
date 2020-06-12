const { mapDB } = require('../../../db');
const { dbIdSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { mapSchema } = require('./index.model');

const getMap = async (req, res, next) => {
  try {
    const map = await mapDB.findOne({});

    if (!map) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać danych dla mapy.');
    }

    res.status(200).json({ ...map });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateMap = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = mapSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const map = await mapDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!map) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować koordynatów mapy.');
    }

    res.status(200).json({ ...map });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  updateMap,
  getMap,
};
