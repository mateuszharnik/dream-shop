const { statusCodesConstants } = require('../helpers/constants');
const {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  resetPasswordIdSchema,
} = require('./index.model');

const { CONFLICT } = statusCodesConstants;

const validateCredentials = (req, res, next) => {
  const { schemaError, data: credentials } = loginSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.credentials = credentials;

  next();
};

const validateRecoveryPasswords = (req, res, next) => {
  const { schemaError, data: passwords } = recoveryPasswordSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.passwords = passwords;

  next();
};

const validateRecoveryLink = (req, res, next) => {
  const { schemaError, data: email } = recoveryLinkSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.email = email.email;

  next();
};

const validateRecoveryId = (req, res, next) => {
  const { schemaError } = resetPasswordIdSchema(req.params);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  next();
};

module.exports = {
  validateCredentials,
  validateRecoveryId,
  validateRecoveryPasswords,
  validateRecoveryLink,
};
