const { setUser } = require('../../helpers/auth');
const { ADMIN } = require('../../helpers/variables/constants/users');
const { AUTHORIZATION } = require('../../helpers/variables/constants/auth');
const {
  accessNotAllowed,
  userIsLoggedIn,
} = require('../../helpers/variables/errors');
const {
  FORBIDDEN,
  UNAUTHORIZED,
} = require('../../helpers/variables/constants/status-codes');

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
    return req.data.responseWithError(UNAUTHORIZED, accessNotAllowed);
  }

  next();
};

const isAdminOrOwner = (req, res, next) => {
  if (req.user._id !== req.params.id || req.user.roles.indexOf(ADMIN) === -1) {
    return req.data.responseWithError(UNAUTHORIZED, accessNotAllowed);
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return req.data.responseWithError(UNAUTHORIZED, accessNotAllowed);
  }

  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return req.data.responseWithError(FORBIDDEN, userIsLoggedIn);
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
