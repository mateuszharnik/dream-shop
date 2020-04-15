const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/token');
const { generateRandomBytes } = require('../helpers/auth');
const { users } = require('../db');
const {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  idSchema,
} = require('./index.model');
const {
  responseWithError,
  checkLoginErrors,
  checkRecoveryLinkErrors,
  checkRecoveryPasswordErrors,
  checkIdErrors,
} = require('../helpers/errors');

const ONE_HOUR = 1000 * 60 * 60;

// eslint-disable-next-line no-unused-vars
const loginUser = async (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, 404, 'Użytkownik jest aktualnie zalogowany');
  }

  const { error: schemaError } = loginSchema.validate(req.body);

  if (schemaError) {
    return checkLoginErrors(schemaError, res, next);
  }

  try {
    const user = await users.findOne({ username: req.body.username });

    if (!user) {
      return responseWithError(res, next, 500, 'Użytkownik nie istnieje');
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
      return responseWithError(res, next, 500, 'Błędne hasło lub nazwa użytkownika');
    }

    const {
      _id, username, name, email, img, roles,
    } = user;

    const payload = {
      _id, username, name, email, img, roles,
    };

    const token = await signToken(payload, '1d');

    if (token) {
      res.status(200).json({ ...payload, token });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const sendRecoveryLink = async (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, 404, 'Użytkownik jest aktualnie zalogowany');
  }

  const { error: schemaError } = recoveryLinkSchema.validate(req.body);

  if (schemaError) {
    return checkRecoveryLinkErrors(schemaError, res, next);
  }

  try {
    const user = await users.findOne({ email: req.body.email });

    if (!user) {
      return responseWithError(res, next, 500, 'Podany email nie znajduje się w bazie danych');
    }

    const resetPasswordToken = await generateRandomBytes(user._id);
    const resetPasswordTokenExp = new Date().getTime() + ONE_HOUR;

    const newUser = await users.findOneAndUpdate(
      { email: req.body.email },
      { $set: { resetPasswordToken, resetPasswordTokenExp } },
    );

    if (!newUser) {
      return responseWithError(res, next, 500, 'Nie udało się wygenerować tokenu');
    }

    res.status(200).json({ resetPasswordToken, resetPasswordTokenExp });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const recoveryPassword = async (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, 404, 'Użytkownik jest aktualnie zalogowany');
  }

  const { error: idSchemaError } = idSchema.validate(req.params);

  if (idSchemaError) {
    return checkIdErrors(idSchemaError, res, next);
  }

  const { error: schemaError } = recoveryPasswordSchema.validate(req.body);

  if (schemaError) {
    return checkRecoveryPasswordErrors(schemaError, res, next);
  }

  try {
    const user = await users.findOne({ resetPasswordToken: req.params.id });

    if (!user || user.resetPasswordTokenExp < new Date().getTime()) {
      return responseWithError(res, next, 500, 'Link wygasł');
    }

    const password = await bcrypt.hash(req.body.password, 12);

    const newUser = await users.findOneAndUpdate(
      { resetPasswordToken: req.params.id },
      { $set: { resetPasswordToken: null, resetPasswordTokenExp: null, password } },
    );

    if (!newUser) {
      return responseWithError(res, next, 500, 'Link wygasł');
    }

    const {
      _id, username, name, email, img, roles,
    } = newUser;

    const payload = {
      _id, username, name, email, img, roles,
    };

    const token = await signToken(payload, '1d');

    if (token) {
      res.status(200).json({ ...payload, token });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const checkRecoveryLink = async (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, 404, 'Użytkownik jest aktualnie zalogowany');
  }

  const { error: idSchemaError } = idSchema.validate(req.params);

  if (idSchemaError) {
    return checkIdErrors(idSchemaError, res, next);
  }

  try {
    const user = await users.findOne({ resetPasswordToken: req.params.id });

    if (!user || user.resetPasswordTokenExp < new Date().getTime()) {
      return responseWithError(res, next, 500, 'Link wygasł');
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  loginUser,
  sendRecoveryLink,
  recoveryPassword,
  checkRecoveryLink,
};
