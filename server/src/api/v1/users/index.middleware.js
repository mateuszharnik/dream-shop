const sharp = require('sharp');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { avatarFileSchema } = require('../../../models');
const { updateUserSchema } = require('./index.model');
const { getAvatarUrl } = require('../../../helpers/files');
const { usersDB } = require('../../../db');
const {
  errorsConstants,
  statusCodesConstants,
} = require('../../../helpers/constants');
const { JPEG, JPEG_EXT } = require('../../../helpers/constants/types');
const {
  USER_NOT_FOUND,
  USERNAME_ALREADY_EXIST,
  EMAIL_ALREADY_EXIST,
  PASSWORDS_ARE_NOT_THE_SAME,
} = require('../../../helpers/constants/users');

const { ERROR_OCCURRED } = errorsConstants;
const {
  NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR,
} = statusCodesConstants;

const findUser = async (req, res, next) => {
  try {
    const user = await usersDB.findOne({ _id: req.params.id });

    if (!user) {
      return req.data.responseWithError(NOT_FOUND, USER_NOT_FOUND);
    }

    req.data.userDB = user;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkEmail = async (req, res, next) => {
  try {
    if (!req.data.user.email) {
      return next();
    }

    const email = await usersDB.findOne({ email: req.data.user.email });

    if (email && email._id.toString() !== req.params.id) {
      return req.data.responseWithError(CONFLICT, EMAIL_ALREADY_EXIST);
    }

    req.data.newUser.email = req.data.user.email;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkUsername = async (req, res, next) => {
  try {
    if (!req.data.user.username) {
      return next();
    }

    const username = await usersDB.findOne({
      username: req.data.user.username,
    });

    if (username && username._id.toString() !== req.params.id) {
      return req.data.responseWithError(CONFLICT, USERNAME_ALREADY_EXIST);
    }

    req.data.newUser.username = req.data.user.username;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkPasswords = async (req, res, next) => {
  try {
    if (
      !req.data.user.password
      || !req.data.user.new_password
      || !req.data.user.confirm_new_password
    ) {
      return next();
    }

    if (
      !(await bcrypt.compare(req.data.user.password, req.data.userDB.password))
    ) {
      return req.data.responseWithError(CONFLICT, PASSWORDS_ARE_NOT_THE_SAME);
    }

    req.data.newUser.password = await bcrypt.hash(
      req.data.user.new_password,
      12,
    );

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const validateAvatar = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const { schemaError, data: file } = avatarFileSchema(req.file);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.file = file;

  next();
};

const validateUser = (req, res, next) => {
  const { schemaError, data: user } = updateUserSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.user = user;

  req.data.newUser = {
    name: user.name,
    avatar: user.avatar,
  };

  next();
};

const replaceAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const fileName = req.data.file.filename.replace(/\..+$/, JPEG_EXT);
    const filePath = req.data.file.path.replace(/\..+$/, JPEG_EXT);

    await sharp(req.data.file.path)
      .toFormat(JPEG)
      .resize(150)
      .toFile(`${req.data.file.destination}/${fileName}`);

    if (fs.existsSync(req.data.file.path)) {
      fs.unlinkSync(req.data.file.path);
    }

    req.body.avatar = getAvatarUrl({
      ...req.data.file,
      filename: fileName,
      path: filePath,
    });

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  validateAvatar,
  checkPasswords,
  checkEmail,
  checkUsername,
  findUser,
  validateUser,
  replaceAvatar,
};