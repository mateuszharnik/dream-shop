const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/token');
const { sendEmail } = require('../helpers/email');
const { generateRandomBytes } = require('../helpers/auth');
const { usersDB } = require('../db');
const { errorOccurred } = require('../helpers/variables/errors');
const { ONE_HOUR } = require('../helpers/constants/time');
const {
  userNotFoundMessage,
  passwordOrUsernameNotCorrectMessage,
} = require('../helpers/variables/users');
const {
  linkExpiredMessage,
  tokenNotGeneratedMessage,
  messageSendSuccessMessage,
  emailNotExistMessage,
  tokenTime,
  tokenLength,
} = require('../helpers/variables/auth');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../helpers/constants/status-codes');
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
  CLIENT_URL,
} = require('../config');

const loginUser = async (req, res) => {
  try {
    const user = await usersDB.findOne({
      $or: [
        { username: req.data.credentials.username },
        { email: req.data.credentials.username },
      ],
    });

    if (!user) {
      return req.data.responseWithError(NOT_FOUND, userNotFoundMessage);
    }

    if (!(await bcrypt.compare(req.data.credentials.password, user.password))) {
      return req.data.responseWithError(
        CONFLICT,
        passwordOrUsernameNotCorrectMessage,
      );
    }

    const {
      _id,
      username,
      name,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    } = user;

    const payload = {
      _id,
      username,
      name,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    };

    const token = await signToken(payload, tokenTime);

    res.status(OK).json({ user: { ...payload }, token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const sendRecoveryLink = async (req, res) => {
  try {
    const user = await usersDB.findOne({ email: req.data.email });

    if (!user) {
      return req.data.responseWithError(CONFLICT, emailNotExistMessage);
    }

    const resetPasswordToken = await generateRandomBytes(user._id);
    const resetPasswordTokenExp = new Date().getTime() + ONE_HOUR;

    const newUser = await usersDB.findOneAndUpdate(
      { email: req.data.email },
      {
        $set: {
          reset_password_token: resetPasswordToken,
          reset_password_token_exp: resetPasswordTokenExp,
        },
      },
    );

    if (!newUser) {
      return req.data.responseWithError(CONFLICT, tokenNotGeneratedMessage);
    }

    if (!(EMAIL_HOST && EMAIL_PORT && EMAIL_LOGIN && EMAIL_PASSWORD)) {
      return res.status(OK).json({
        message: `${CLIENT_URL}/odzyskaj/${newUser.reset_password_token}`,
      });
    }

    const success = await sendEmail(newUser);

    if (success) {
      res.status(OK).json({ message: messageSendSuccessMessage });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const recoveryPassword = async (req, res) => {
  try {
    const user = await usersDB.findOne({ reset_password_token: req.params.id });

    if (!user || user.reset_password_token_exp < new Date().getTime()) {
      return req.data.responseWithError(CONFLICT, linkExpiredMessage);
    }

    const password = await bcrypt.hash(
      req.data.passwords.password,
      tokenLength,
    );

    const newUser = await usersDB.findOneAndUpdate(
      { reset_password_token: req.params.id },
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
      return req.data.responseWithError(CONFLICT, linkExpiredMessage);
    }

    const {
      _id,
      username,
      name,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    } = newUser;

    const payload = {
      _id,
      username,
      name,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    };

    const token = await signToken(payload, tokenTime);

    res.status(OK).json({ user: { ...payload }, token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const checkRecoveryLink = async (req, res) => {
  try {
    const user = await usersDB.findOne({ reset_password_token: req.params.id });

    if (!user || user.reset_password_token_exp < new Date().getTime()) {
      return req.data.responseWithError(CONFLICT, linkExpiredMessage);
    }

    res.status(OK).json({ email: user.email });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  loginUser,
  sendRecoveryLink,
  recoveryPassword,
  checkRecoveryLink,
};
