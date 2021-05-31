const commentSchema = require('./index.model');
const { commentsDB, usersDB, productsDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');
const { ADMIN } = require('../../../helpers/variables/constants/users');
const { DESC } = require('../../../helpers/variables/constants/queries');
const {
  errorOccurred,
  accessNotAllowed,
} = require('../../../helpers/variables/errors');
const {
  commentsNotFoundMessage,
  commentNotFoundMessage,
  ownerOfCommentNotExistMessage,
  commentCannotBeEditedMessage,
  productWithCommentNotFoundMessage,
  defaultUsername,
} = require('../../../helpers/variables/comments');
const {
  UNAUTHORIZED,
  CONFLICT,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const validateComment = (req, res, next) => {
  req.body.user_id = req.user && req.user._id ? req.user._id : '';

  const { schemaError, data: comment } = commentSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  comment.purify_content = purify(comment.content);

  req.data.comment = comment;

  next();
};

const findComment = async (req, res, next) => {
  try {
    const comment = await commentsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!comment) {
      return req.data.responseWithError(NOT_FOUND, commentNotFoundMessage);
    }

    req.data.comment = comment;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findComments = async (req, res, next) => {
  const { product_id = '', sort = DESC } = req.query;
  const { skip, limit } = req.data;

  try {
    const query = { deleted_at: null };

    if (product_id) {
      query.product_id = product_id;
    }

    const total = await commentsDB.count(query);
    const comments = await commentsDB.find(query, {
      skip,
      limit,
      sort: {
        created_at: sort === DESC ? -1 : 1,
      },
    });

    if (!comments) {
      return req.data.responseWithError(NOT_FOUND, commentsNotFoundMessage);
    }

    req.data.comments = comments;
    req.data.total = total;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findUsersInfo = async (req, res, next) => {
  const { comments } = req.data;

  try {
    const arrayOfIDs = comments
      .filter((comment) => comment.user_id)
      .map((comment) => comment.user_id);

    const users = await usersDB.find({ _id: { $in: arrayOfIDs } });

    req.data.users = users || [];

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const addUsersInfoToComments = async (req, res, next) => {
  const { comments, users } = req.data;

  try {
    const commentsWithUserInfo = comments.map((comment) => {
      const author = {
        username: defaultUsername,
        avatar: '',
      };

      if (comment.user_id) {
        const { username, avatar } = users.find(
          (user) => user._id.toString() === comment.user_id,
        );

        author.username = username;
        author.avatar = avatar;
      }

      return {
        ...comment,
        ...author,
      };
    });

    req.data.comments = commentsWithUserInfo;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const checkIfUserIsOwnerOfComment = (req, res, next) => {
  const { comment } = req.data;
  const { user } = req;

  if (
    (comment.user_id && user._id !== comment.user_id)
    || user.roles.indexOf(ADMIN) === -1
  ) {
    return req.data.responseWithError(UNAUTHORIZED, accessNotAllowed);
  }

  next();
};

const checkIfCommentAuthorIsNotAnonim = (req, res, next) => {
  const { comment } = req.data;

  if (!comment.user_id) {
    return req.data.responseWithError(CONFLICT, commentCannotBeEditedMessage);
  }

  next();
};

const addAuthorInfo = (isDeleted = false) => async (req, res, next) => {
  const { comment } = req.data;

  try {
    const author = {
      username: defaultUsername,
      avatar: '',
    };

    const query = { _id: comment.user_id };

    if (isDeleted) {
      query.deleted_at = null;
    }

    if (comment.user_id) {
      const user = await usersDB.findOne(query);

      if (!user && isDeleted) {
        return req.data.responseWithError(
          NOT_FOUND,
          ownerOfCommentNotExistMessage,
        );
      }

      if (user) {
        author.username = user.username;
        author.avatar = user.avatar;
      }
    }

    req.data.author = author;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findProduct = async (req, res, next) => {
  const { comment } = req.data;

  try {
    const product = await productsDB.findOne({
      _id: comment.product_id,
      deleted_at: null,
    });

    if (!product) {
      return req.data.responseWithError(
        NOT_FOUND,
        productWithCommentNotFoundMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  validateComment,
  findComment,
  findComments,
  findUsersInfo,
  addUsersInfoToComments,
  checkIfUserIsOwnerOfComment,
  checkIfCommentAuthorIsNotAnonim,
  addAuthorInfo,
  findProduct,
};
