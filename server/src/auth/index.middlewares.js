const { responseWithError } = require('../helpers/errors');
const { setUser } = require('../helpers/auth');
const {
  statusCodesConstants,
  errorsConstants,
} = require('../helpers/constants');

const { FORBIDDEN, UNAUTHORIZED } = statusCodesConstants;
const { ACCESS_NOT_ALLOWED, USER_IS_LOGGED_IN } = errorsConstants;

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
    return responseWithError(res, next, UNAUTHORIZED, ACCESS_NOT_ALLOWED);
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return responseWithError(res, next, UNAUTHORIZED, ACCESS_NOT_ALLOWED);
  }

  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return responseWithError(res, next, FORBIDDEN, USER_IS_LOGGED_IN);
  }

  next();
};

module.exports = {
  checkToken,
  isAdmin,
  isLoggedIn,
  isNotLoggedIn,
};
