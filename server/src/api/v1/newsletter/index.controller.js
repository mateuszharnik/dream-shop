const { emailsDB } = require('../../../db');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const { DESC } = require('../../../helpers/constants/queries');
const {
  emailsNotFoundMessage,
  emailsDeletedMessage,
  emailNotDeletedMessage,
  emailsNotDeletedMessage,
  emailNotFoundMessage,
  emailAlreadyExistMessage,
  emailNotCreatedMessage,
} = require('../../../helpers/variables/newsletter');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getEmails = async (req, res) => {
  const { sort = DESC } = req.query;
  const { skip, limit } = req.data;

  try {
    const total = await emailsDB.count({ deleted_at: null });
    const emails = await emailsDB.find(
      { deleted_at: null },
      {
        skip,
        limit,
        sort: {
          created_at: sort === DESC ? -1 : 1,
        },
      },
    );

    if (!emails) {
      return req.data.responseWithError(NOT_FOUND, emailsNotFoundMessage);
    }

    res.status(OK).json({
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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteEmails = async (req, res) => {
  try {
    const emails = await emailsDB.find({ deleted_at: null });

    if (!emails.length) {
      return req.data.responseWithError(NOT_FOUND, emailsNotFoundMessage);
    }

    const deletedEmails = await emailsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedEmails) {
      return req.data.responseWithError(CONFLICT, emailsNotDeletedMessage);
    }

    res.status(OK).json({
      message: emailsDeletedMessage,
      items: deletedEmails.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteEmail = async (req, res) => {
  try {
    const email = await emailsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!email) {
      return req.data.responseWithError(NOT_FOUND, emailNotFoundMessage);
    }

    const deletedEmail = await emailsDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedEmail) {
      return req.data.responseWithError(CONFLICT, emailNotDeletedMessage);
    }

    res.status(OK).json(deletedEmail);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const addEmail = async (req, res) => {
  try {
    const email = await emailsDB.findOne({
      email: req.data.email.email,
      deleted_at: null,
    });

    if (email) {
      return req.data.responseWithError(CONFLICT, emailAlreadyExistMessage);
    }

    const createdEmail = await emailsDB.insert({
      ...req.data.email,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!createdEmail) {
      return req.data.responseWithError(CONFLICT, emailNotCreatedMessage);
    }

    res.status(OK).json(createdEmail);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  deleteEmails,
  deleteEmail,
  addEmail,
  getEmails,
};
