const { aboutSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { aboutDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');

const getAbout = async (req, res, next) => {
  try {
    const about = await aboutDB.findOne({});

    if (!about) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać informacji o sklepie.');
    }

    res.status(200).json({ ...about });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateAbout = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  req.body.information = purify(req.body.information);

  const { schemaError, data } = aboutSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const about = await aboutDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!about) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować informacji o sklepie.');
    }

    res.status(200).json({ ...about });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  updateAbout,
  getAbout,
};
