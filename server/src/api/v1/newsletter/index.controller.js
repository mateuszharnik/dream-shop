const { emailsDB } = require('../../../db');
const {
  EMAILS_NOT_FOUND,
  EMAILS_DELETED,
  EMAIL_NOT_DELETED,
  EMAILS_NOT_DELETED,
  EMAIL_NOT_FOUND,
  EMAIL_ALREADY_EXIST,
  EMAIL_NOT_CREATED,
} = require('../../../helpers/constants/newsletter');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const { DESC } = require('../../../helpers/constants/queries');
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
      return req.data.responseWithError(NOT_FOUND, EMAILS_NOT_FOUND);
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
      return req.data.responseWithError(NOT_FOUND, EMAILS_NOT_FOUND);
    }

    const deletedEmails = await emailsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedEmails) {
      return req.data.responseWithError(CONFLICT, EMAILS_NOT_DELETED);
    }

    res.status(OK).json({
      message: EMAILS_DELETED,
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
      return req.data.responseWithError(NOT_FOUND, EMAIL_NOT_FOUND);
    }

    const deletedEmail = await emailsDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedEmail) {
      return req.data.responseWithError(CONFLICT, EMAIL_NOT_DELETED);
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
      return req.data.responseWithError(CONFLICT, EMAIL_ALREADY_EXIST);
    }

    const createdEmail = await emailsDB.insert({
      ...req.data.email,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!createdEmail) {
      return req.data.responseWithError(CONFLICT, EMAIL_NOT_CREATED);
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
