const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/token');
const { generateRandomBytes } = require('../helpers/auth');
const { usersDB } = require('../db');
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

  const { error: schemaError, value: data } = loginSchema.validate(req.body);

  if (schemaError) {
    return checkLoginErrors(schemaError, res, next);
  }

  try {
    const user = await usersDB.findOne({ username: data.username });

    if (!user) {
      return responseWithError(res, next, 500, 'Użytkownik nie istnieje');
    }

    if (!await bcrypt.compare(data.password, user.password)) {
      return responseWithError(res, next, 500, 'Błędne hasło lub nazwa użytkownika');
    }

    const {
      _id, username, name, email, img, roles, created_at, updated_at,
    } = user;

    const payload = {
      _id, username, name, email, img, roles, created_at, updated_at,
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

  const { error: schemaError, value: data } = recoveryLinkSchema.validate(req.body);

  if (schemaError) {
    return checkRecoveryLinkErrors(schemaError, res, next);
  }

  try {
    const user = await usersDB.findOne({ email: data.email });

    if (!user) {
      return responseWithError(res, next, 500, 'Podany email nie znajduje się w bazie danych');
    }

    const resetPasswordToken = await generateRandomBytes(user._id);
    const resetPasswordTokenExp = new Date().getTime() + ONE_HOUR;

    const newUser = await usersDB.findOneAndUpdate(
      { email: data.email },
      {
        $set: {
          reset_password_token: resetPasswordToken,
          reset_password_token_exp: resetPasswordTokenExp,
        },
      },
    );

    if (!newUser) {
      return responseWithError(res, next, 500, 'Nie udało się wygenerować tokenu');
    }

    res.status(200).json({
      reset_password_token: resetPasswordToken,
      reset_password_token_exp: resetPasswordTokenExp,
    });
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

  const { error: paramsSchemaError, value: params } = idSchema.validate(req.params);

  if (paramsSchemaError) {
    return checkIdErrors(paramsSchemaError, res, next);
  }

  const { error: schemaError, value: data } = recoveryPasswordSchema.validate(req.body);

  if (schemaError) {
    return checkRecoveryPasswordErrors(schemaError, res, next);
  }

  try {
    const user = await usersDB.findOne({ reset_password_token: params.id });

    if (!user || user.reset_password_token_exp < new Date().getTime()) {
      return responseWithError(res, next, 500, 'Link wygasł');
    }

    const password = await bcrypt.hash(data.password, 12);

    const newUser = await usersDB.findOneAndUpdate(
      { reset_password_token: params.id },
      {
        $set: {
          reset_password_token: null,
          reset_password_token_exp: null,
          updated_at: new Date(),
          password,
        },
      },
    );

    if (!newUser) {
      return responseWithError(res, next, 500, 'Link wygasł');
    }

    const {
      _id, username, name, email, img, roles, created_at, updated_at,
    } = newUser;

    const payload = {
      _id, username, name, email, img, roles, created_at, updated_at,
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

  const { error: paramsSchemaError, value: params } = idSchema.validate(req.params);

  if (paramsSchemaError) {
    return checkIdErrors(paramsSchemaError, res, next);
  }

  try {
    const user = await usersDB.findOne({ reset_password_token: params.id });

    if (!user || user.reset_password_token_exp < new Date().getTime()) {
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
