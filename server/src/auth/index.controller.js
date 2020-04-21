const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/token');
const { generateRandomBytes } = require('../helpers/auth');
const { usersDB } = require('../db');
const { responseWithError } = require('../helpers/errors');
const {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  resetPasswordIdSchema,
} = require('./index.model');

const ONE_HOUR = 1000 * 60 * 60;

// eslint-disable-next-line no-unused-vars
const loginUser = async (req, res, next) => {
  const { schemaError, data } = loginSchema(req.body);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
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
  const { schemaError, data } = recoveryLinkSchema(req.body);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
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
  const { schemaError: paramsSchemaError, data: params } = resetPasswordIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = recoveryPasswordSchema(req.body);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
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
  const { schemaError: paramsSchemaError, data: params } = resetPasswordIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
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
