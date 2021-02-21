const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getComments,
  getComment,
  deleteComments,
  deleteComment,
  updateComment,
  addComment,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getComments,
);

router.get(
  '/:id',
  getComment,
);

router.post(
  '/',
  isNotLoggedIn,
  addComment,
);

router.put(
  '/:id',
  isNotLoggedIn,
  updateComment,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteComments,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteComment,
);

module.exports = router;
