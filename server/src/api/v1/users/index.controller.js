const bcrypt = require('bcryptjs');
const { signToken } = require('../../../helpers/token');
const { responseWithError } = require('../../../helpers/errors');
const { dbIdSchema, avatarFileSchema } = require('../../../models');
const { updateUserSchema } = require('./index.model');
const { usersDB } = require('../../../db');
const { getAvatarUrl } = require('../../../helpers/files');

const getUser = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  if (req.user._id !== params.id || req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 400, 'Brak dostępu');
  }

  try {
    const user = await usersDB.findOne({ _id: params.id });

    if (!user) {
      return responseWithError(res, next, 500, 'Użytkownik nie istnieje');
    }

    const {
      _id, name, username, email, avatar, roles, created_at, updated_at,
    } = user;

    const payload = {
      _id, name, username, email, avatar, roles, created_at, updated_at,
    };

    // const token = await signToken(payload, '1d');

    res.status(200).json({ ...payload });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateUser = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  if (req.user._id !== params.id || req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 400, 'Brak dostępu');
  }

  if (req.file) {
    const { schemaError: fileSchemaError, data: file } = avatarFileSchema(req.file);

    if (fileSchemaError) {
      return responseWithError(res, next, 400, fileSchemaError.details[0].message);
    }

    req.body.avatar = getAvatarUrl(file);
  }

  const { schemaError, data } = updateUserSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const user = await usersDB.findOne({ _id: params.id });

    if (!user) {
      return responseWithError(res, next, 500, 'Użytkownik nie istnieje');
    }

    const newUser = {
      name: data.name,
      avatar: data.avatar,
    };

    if (data.email) {
      const email = await usersDB.findOne({ email: data.email });

      if (email && email._id.toString() !== params.id) {
        return responseWithError(res, next, 500, 'Adres email jest już zajęty');
      }

      newUser.email = data.email;
    }

    if (data.username) {
      const username = await usersDB.findOne({ username: data.username });

      if (username && username._id.toString() !== params.id) {
        return responseWithError(res, next, 500, 'Nazwa użytkownika jest już zajęta');
      }

      newUser.username = data.username;
    }

    if (data.password && data.new_password && data.confirm_new_password) {
      if (!await bcrypt.compare(data.password, user.password)) {
        return responseWithError(res, next, 500, 'Błędne hasło');
      }

      newUser.password = await bcrypt.hash(data.new_password, 12);
    }

    const updatedUser = await usersDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...newUser,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedUser) {
      return responseWithError(res, next, 500, 'Nie udało się zapisać zmian');
    }

    const {
      _id, name, username, email, avatar, roles, created_at, updated_at,
    } = updatedUser;

    const payload = {
      _id, name, username, email, avatar, roles, created_at, updated_at,
    };

    if (req.user._id === params.id) {
      const token = await signToken(payload, '1d');

      res.status(200).json({ ...payload, token });
    } else {
      res.status(200).json({ ...payload });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getUser,
  updateUser,
};
