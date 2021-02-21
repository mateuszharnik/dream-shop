const { regulationsSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { regulationsDB } = require('../../../db');
const { dbIdSchema } = require('../../../models');
const { purify } = require('../../../helpers/sanitize');

const getRegulations = async (req, res, next) => {
  const { name = '' } = req.query;

  const query = {
    deleted_at: null,
  };

  if (name) {
    query.name = name;
  }

  try {
    const regulations = await regulationsDB.find(query);

    if (!regulations) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać regulaminu.');
    }

    res.status(200).json(regulations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getRegulation = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const regulations = await regulationsDB.findOne({ _id: params.id });

    if (!regulations) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać regulaminu.');
    }

    res.status(200).json(regulations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateRegulations = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = regulationsSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const regulations = await regulationsDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!regulations) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować regulaminu.');
    }

    res.status(200).json(regulations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  updateRegulations,
  getRegulations,
  getRegulation,
};
