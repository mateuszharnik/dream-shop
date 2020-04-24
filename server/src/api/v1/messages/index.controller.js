const { messagesDB } = require('../../../db');
const { dbIdSchema, messagesSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { purify } = require('../../../helpers/sanitize');

const getMessages = async (req, res, next) => {
  try {
    const messages = await messagesDB.find({ deleted_at: null });

    if (!messages) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać wiadomości');
    }

    res.status(200).json(messages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getMessage = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const message = await messagesDB.findOne({ _id: params.id });

    if (!message || (message && message.deleted_at)) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać wiadomości');
    }

    const readedMessage = await messagesDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...message,
          readed: true,
        },
      },
    );

    if (!readedMessage) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać wiadomości');
    }

    res.status(200).json({ ...readedMessage });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const sendMessage = async (req, res, next) => {
  req.body.subject = purify(req.body.subject);
  req.body.message = purify(req.body.message);

  const { schemaError, data } = messagesSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const message = await messagesDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!message) {
      return responseWithError(res, next, 500, 'Nie udało się wysłać wiadomości');
    }

    res.status(200).json({ ...message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const deleteMessages = async (req, res, next) => {
  try {
    const messages = await messagesDB.find({ deleted_at: null });

    if (!messages.length) {
      return responseWithError(res, next, 500, 'W bazie danych nie ma żadnych wiadomości');
    }

    const deletedMessages = await messagesDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedMessages) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć wiadomości');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie wiadomości',
      deleted_messages: deletedMessages.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const deleteMessage = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const message = await messagesDB.findOne({ _id: params.id });

    if (!message || (message && message.deleted_at)) {
      return responseWithError(res, next, 500, 'Wiadomość nie znajduje się w bazie danych');
    }

    const updatedMessage = await messagesDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedMessage) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć wiadomości');
    }

    res.status(200).json({ ...updatedMessage });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getMessages, getMessage, sendMessage, deleteMessages, deleteMessage,
};
