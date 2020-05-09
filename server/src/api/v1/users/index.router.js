const { Router } = require('express');
const { isNotLoggedIn } = require('../../../auth/index.middlewares');
const { getUser, updateUser } = require('./index.controller');
const { avatarUpload } = require('../../../middlewares/files');

const router = Router();

router.get(
  '/:id',
  isNotLoggedIn,
  getUser,
);

router.put(
  '/:id',
  isNotLoggedIn,
  avatarUpload.single('avatar'),
  updateUser,
);

module.exports = router;
