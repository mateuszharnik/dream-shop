const { setUser } = require('../../helpers/auth');
const {
  statusCodesConstants,
  errorsConstants,
} = require('../../helpers/constants');
const { ADMIN } = require('../../helpers/constants/users');
const { AUTHORIZATION } = require('../../helpers/constants/auth');

const { FORBIDDEN, UNAUTHORIZED } = statusCodesConstants;
const { ACCESS_NOT_ALLOWED, USER_IS_LOGGED_IN } = errorsConstants;

const checkToken = async (req, res, next) => {
  const authHeader = req.get(AUTHORIZATION);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      await setUser(req, token);
    }
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.roles.indexOf(ADMIN) === -1) {
    return req.data.responseWithError(UNAUTHORIZED, ACCESS_NOT_ALLOWED);
  }

  next();
};

const isAdminOrOwner = (req, res, next) => {
  if (req.user._id !== req.params.id || req.user.roles.indexOf(ADMIN) === -1) {
    return req.data.responseWithError(UNAUTHORIZED, ACCESS_NOT_ALLOWED);
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return req.data.responseWithError(UNAUTHORIZED, ACCESS_NOT_ALLOWED);
  }

  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return req.data.responseWithError(FORBIDDEN, USER_IS_LOGGED_IN);
  }

  next();
};

module.exports = {
  checkToken,
  isAdmin,
  isAdminOrOwner,
  isLoggedIn,
  isNotLoggedIn,
};
