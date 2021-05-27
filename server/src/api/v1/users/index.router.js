const { Router } = require('express');
const { validateDBId } = require('../../../middlewares/validation');
const { isNotLoggedIn, isAdminOrOwner } = require('../../../middlewares/auth');
const { getUser, updateUser } = require('./index.controller');
const { avatarUpload } = require('../../../middlewares/files');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const {
  validateAvatar,
  checkPasswords,
  checkEmail,
  checkUsername,
  findUser,
  validateUser,
  replaceAvatar,
} = require('./index.middleware');

const router = Router();

router.get(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  validateDBId,
  isAdminOrOwner,
  getUser,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  validateDBId,
  isAdminOrOwner,
  avatarUpload.single('avatar'),
  validateAvatar,
  replaceAvatar,
  validateUser,
  findUser,
  checkEmail,
  checkUsername,
  checkPasswords,
  updateUser,
);

module.exports = router;
