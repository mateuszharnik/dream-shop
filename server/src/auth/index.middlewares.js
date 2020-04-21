const { responseWithError } = require('../helpers/errors');
const { setUser } = require('../helpers/auth');

const checkToken = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      await setUser(req, token);
    }
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.roles.indexOf('administrator') === -1) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, 500, 'Brak dostępu');
  }

  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, 404, 'Użytkownik jest aktualnie zalogowany');
  }

  next();
};

module.exports = {
  checkToken,
  isAdmin,
  isLoggedIn,
  isNotLoggedIn,
};
