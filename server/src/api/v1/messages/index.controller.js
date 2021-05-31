const { messagesDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { DESC } = require('../../../helpers/variables/constants/queries');
const {
  messageNotFoundMessage,
  messageNotUpdatedMessage,
  messagesNotDeletedMessage,
  messagesDeletedMessage,
  messageNotCreatedMessage,
  messagesNotFoundMessage,
  messageNotDeletedMessage,
} = require('../../../helpers/variables/messages');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

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
      return req.data.responseWithError(NOT_FOUND, messagesNotFoundMessage);
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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await messagesDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(NOT_FOUND, messageNotFoundMessage);
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
      return req.data.responseWithError(CONFLICT, messageNotUpdatedMessage);
    }

    res.status(OK).json(updatedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const addMessage = async (req, res) => {
  try {
    const message = await messagesDB.insert({
      ...req.data.message,
      readed: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(CONFLICT, messageNotCreatedMessage);
    }

    res.status(OK).json(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteMessages = async (req, res) => {
  try {
    const messages = await messagesDB.find({ deleted_at: null });

    if (!messages.length) {
      return req.data.responseWithError(NOT_FOUND, messagesNotFoundMessage);
    }

    const deletedMessages = await messagesDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedMessages) {
      return req.data.responseWithError(CONFLICT, messagesNotDeletedMessage);
    }

    res.status(OK).json({
      message: messagesDeletedMessage,
      items: deletedMessages.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await messagesDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!message) {
      return req.data.responseWithError(NOT_FOUND, messageNotFoundMessage);
    }

    const deletedMessage = await messagesDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedMessage) {
      return req.data.responseWithError(CONFLICT, messageNotDeletedMessage);
    }

    res.status(OK).json(deletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  getMessages,
  getMessage,
  addMessage,
  deleteMessages,
  deleteMessage,
};
