const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { validateDBId } = require('../../../middlewares/validation');
const {
  commentsLimiterMessage,
  commentsLimiterLength,
  commentsLimiterTime,
} = require('../../../helpers/variables/limiter');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const {
  validateComment,
  findComment,
  findComments,
  findUsersInfo,
  addUsersInfoToComments,
  checkIfUserIsOwnerOfComment,
  checkIfCommentAuthorIsNotAnonim,
  addAuthorInfo,
  findProduct,
} = require('./index.middleware');
const {
  getComments,
  getComment,
  deleteComments,
  deleteComment,
  updateComment,
  addComment,
} = require('./index.controller');

const sendCommentLimiter = rateLimit({
  windowMs: commentsLimiterTime,
  max: commentsLimiterLength,
  message: commentsLimiterMessage,
});

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getSkipAndLimit,
  findComments,
  findUsersInfo,
  addUsersInfoToComments,
  getComments,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  validateDBId,
  findComment,
  addAuthorInfo(),
  getComment,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  validateComment,
  findProduct,
  addAuthorInfo(true),
  sendCommentLimiter,
  addComment,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  validateDBId,
  findComment,
  checkIfCommentAuthorIsNotAnonim,
  validateComment,
  findProduct,
  addAuthorInfo(true),
  updateComment,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteComments,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  validateDBId,
  findComment,
  checkIfUserIsOwnerOfComment,
  addAuthorInfo(),
  deleteComment,
);

module.exports = router;
