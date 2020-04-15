const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/token');
const { loginSchema } = require('./index.model');
const { responseWithError, checkLoginErrors } = require('../helpers/errors');
const { users } = require('../db');

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

    if (token) res.status(200).json({ ...payload, token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Użytkownik nie istnieje');
  }
};

module.exports = { loginUser };
