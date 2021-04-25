const commentSchema = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const { CONFLICT } = require('../../../helpers/constants/status-codes');

const validateComment = (req, res, next) => {
  const { schemaError, data: comment } = commentSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  comment.purify_content = purify(comment.content);

  req.data.comment = comment;

  next();
};

module.exports = {
  validateComment,
};
