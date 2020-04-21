const { contactSchema } = require('./index.model');
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
  const { schemaError, data } = contactSchema(req.body, true, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const contact = await contactDB.findOneAndUpdate(
      { _id: data._id },
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
