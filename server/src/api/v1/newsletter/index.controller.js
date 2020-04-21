const { newsletterSchema, dbIdSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { emailsDB } = require('../../../db');

const deleteEmails = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  try {
    const emails = await emailsDB.find({ deleted_at: null });

    if (!emails.length) {
      return responseWithError(res, next, 500, 'W bazie nie ma żadnych adresów email');
    }

    const deletedEmails = await emailsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedEmails) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć adresów email');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie adresy email',
      deleted_emails: deletedEmails.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const deleteEmail = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const email = await emailsDB.findOne({ _id: params.id });

    if (!email || (email && email.deleted_at)) {
      return responseWithError(res, next, 500, 'Podany adres email nie znajduje się w bazie danych');
    }

    const updatedEmail = await emailsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedEmail) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć adresu email');
    }

    res.status(200).json({ ...updatedEmail });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const addEmail = async (req, res, next) => {
  const { schemaError, data } = newsletterSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const email = await emailsDB.findOne({ email: data.email });

    if (email && email.deleted_at === null) {
      return responseWithError(res, next, 500, 'Adres email znajduje się już w bazie');
    }

    let newEmail = null;

    if (email && email.deleted_at) {
      newEmail = await emailsDB.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        },
      );
    } else {
      newEmail = await emailsDB.insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (!newEmail) {
      return responseWithError(res, next, 500, 'Nie udało się zapisać adresu email w bazie');
    }

    res.status(200).json({
      _id: newEmail._id,
      email: newEmail.email,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getEmails = async (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  try {
    const emails = await emailsDB.find({ deleted_at: null });

    if (!emails) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać adersów email');
    }

    res.status(200).json(emails);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  deleteEmails,
  deleteEmail,
  addEmail,
  getEmails,
};
