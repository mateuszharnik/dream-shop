const messagesSchema = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateMessage = (req, res, next) => {
  const { schemaError, data: message } = messagesSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  message.purify_subject = purify(message.subject);
  message.purify_message = purify(message.message);

  req.data.message = message;

  next();
};

module.exports = {
  validateMessage,
};
