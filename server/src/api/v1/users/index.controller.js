const fs = require('fs');
const { signToken } = require('../../../helpers/token');
const { usersDB } = require('../../../db');
const { AVATARS } = require('../../../helpers/constants/directories');
const {
  USER_NOT_FOUND,
  USER_NOT_UPDATED,
} = require('../../../helpers/constants/users');
const { TOKEN_TIME } = require('../../../helpers/constants/auth');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const { AVATARS_URL } = require('../../../helpers/constants/url');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getUser = async (req, res) => {
  try {
    const user = await usersDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!user) {
      return req.data.responseWithError(NOT_FOUND, USER_NOT_FOUND);
    }

    const {
      _id,
      name,
      username,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    } = user;

    const payload = {
      _id,
      name,
      username,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    };

    res.status(OK).json(payload);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await usersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.newUser,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedUser) {
      return req.data.responseWithError(CONFLICT, USER_NOT_UPDATED);
    }

    if (
      (req.file && req.data.userDB.avatar)
      || (req.data.userDB.avatar && !req.body.avatar)
    ) {
      const avatarName = req.data.userDB.avatar.replace(AVATARS_URL, '');
      const avatarDir = `${AVATARS}/${avatarName}`;

      if (fs.existsSync(avatarDir)) {
        fs.unlinkSync(avatarDir);
      }
    }

    const {
      _id,
      name,
      username,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    } = updatedUser;

    const payload = {
      _id,
      name,
      username,
      email,
      avatar,
      roles,
      created_at,
      updated_at,
    };

    if (req.user._id === req.params.id) {
      const token = await signToken(payload, TOKEN_TIME);

      res.status(OK).json({ ...payload, token });
    } else {
      res.status(OK).json(payload);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getUser,
  updateUser,
};
