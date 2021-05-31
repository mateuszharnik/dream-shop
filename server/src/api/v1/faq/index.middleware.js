const faqSchema = require('./index.model');
const { purify } = require('../../../helpers/sanitize');
const {
  CONFLICT,
} = require('../../../helpers/variables/constants/status-codes');

const validateFAQ = (req, res, next) => {
  const { schemaError, data: faq } = faqSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  faq.purify_content = purify(faq.content);

  req.data.faq = faq;

  next();
};

module.exports = {
  validateFAQ,
};
