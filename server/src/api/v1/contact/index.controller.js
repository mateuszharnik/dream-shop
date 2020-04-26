const { contactSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { contactDB } = require('../../../db');

const getContact = async (req, res, next) => {
  try {
    const contact = await contactDB.findOne({});

    if (!contact) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać informacji kontaktowych');
    }

    res.status(200).json({ ...contact });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateContact = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = contactSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const contact = await contactDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!contact) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować informacji kontaktowych');
    }

    res.status(200).json({ ...contact });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  updateContact,
  getContact,
};
