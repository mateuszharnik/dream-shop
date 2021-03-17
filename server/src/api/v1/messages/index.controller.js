const { messagesDB } = require('../../../db');
const {
  sortConstants,
  messageConstants,
  errorsConstants,
  statusCodesConstants,
} = require('../../../helpers/constants');

const {
  MESSAGE_NOT_FOUND,
  MESSAGE_NOT_UPDATED,
  MESSAGES_NOT_DELETED,
  MESSAGES_DELETED,
  MESSAGE_NOT_CREATED,
  MESSAGES_NOT_FOUND,
  MESSAGE_NOT_DELETED,
} = messageConstants;
const { ERROR_OCCURRED } = errorsConstants;
const { DESC } = sortConstants;
const {
  OK, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR,
} = statusCodesConstants;

const getMessages = async (req, res) => {
  const { sort = DESC } = req.query;
  const { skip, limit } = req.data;

  try {
    const total = await messagesDB.count({ deleted_at: null });
    const messages = await messagesDB.find(
      { deleted_at: null },
      {
        skip,
        limit,
        sort: {
          created_at: sort === DESC ? -1 : 1,
        },
      },
    );

    if (!messages) {
      return req.data.responseWithError(NOT_FOUND, MESSAGES_NOT_FOUND);
    }

    res.status(OK).json({
      total,
      messages,
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

const getMessage = async (req, res) => {
  try {
    const message = await messagesDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(NOT_FOUND, MESSAGE_NOT_FOUND);
    }

    const updatedMessage = await messagesDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...message,
          readed: true,
        },
      },
    );

    if (!updatedMessage) {
      return req.data.responseWithError(CONFLICT, MESSAGE_NOT_UPDATED);
    }

    res.status(OK).json(updatedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const addMessage = async (req, res) => {
  try {
    const message = await messagesDB.insert({
      ...req.data.message,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(CONFLICT, MESSAGE_NOT_CREATED);
    }

    res.status(OK).json(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteMessages = async (req, res) => {
  try {
    const messages = await messagesDB.find({ deleted_at: null });

    if (!messages.length) {
      return req.data.responseWithError(NOT_FOUND, MESSAGES_NOT_FOUND);
    }

    const deletedMessages = await messagesDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedMessages) {
      return req.data.responseWithError(CONFLICT, MESSAGES_NOT_DELETED);
    }

    res.status(OK).json({
      message: MESSAGES_DELETED,
      items: deletedMessages.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await messagesDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(NOT_FOUND, MESSAGE_NOT_FOUND);
    }

    const deletedMessage = await messagesDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedMessage) {
      return req.data.responseWithError(CONFLICT, MESSAGE_NOT_DELETED);
    }

    res.status(OK).json(deletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getMessages,
  getMessage,
  addMessage,
  deleteMessages,
  deleteMessage,
};
