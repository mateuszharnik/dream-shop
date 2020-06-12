const { newsletterSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { emailsDB } = require('../../../db');

const deleteEmails = async (req, res, next) => {
  try {
    const emails = await emailsDB.find({ deleted_at: null });

    if (!emails.length) {
      return responseWithError(res, next, 500, 'W bazie danych nie ma żadnych adresów email.');
    }

    const deletedEmails = await emailsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedEmails) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć adresów email.');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie adresy email.',
      items: deletedEmails.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteEmail = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const email = await emailsDB.findOne({ _id: params.id });

    if (!email || (email && email.deleted_at)) {
      return responseWithError(res, next, 500, 'Podany adres email nie znajduje się w bazie danych.');
    }

    const deletedEmail = await emailsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedEmail) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć adresu email.');
    }

    res.status(200).json({ ...deletedEmail });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
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
      return responseWithError(res, next, 500, 'Adres email znajduje się już w bazie danych.');
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
      return responseWithError(res, next, 500, 'Nie udało się zapisać adresu email w bazie danych.');
    }

    res.status(200).json({
      _id: newEmail._id,
      email: newEmail.email,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getEmails = async (req, res, next) => {
  const { sort = 'desc' } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  try {
    const total = await emailsDB.count({ deleted_at: null });
    const emails = await emailsDB.find({ deleted_at: null }, {
      skip: Number(skip),
      limit: Number(limit),
      sort: {
        created_at: sort === 'desc' ? -1 : 1,
      },
    });

    if (!emails) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać adersów email.');
    }

    res.status(200).json({
      total,
      emails,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  deleteEmails,
  deleteEmail,
  addEmail,
  getEmails,
};
