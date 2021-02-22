const rateLimit = require('express-rate-limit');
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

const sendCommentLimiter = rateLimit({
  windowMs: 1000 * 60 * 5,
  max: 10,
  message: 'Przekroczono limit. Spróbuj dodać komentarz ponownie później.',
});

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
  sendCommentLimiter,
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
  deleteComment,
);

module.exports = router;
