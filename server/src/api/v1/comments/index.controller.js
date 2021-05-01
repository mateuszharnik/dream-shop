const { commentsDB } = require('../../../db');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
} = require('../../../helpers/constants/status-codes');
const {
  COMMENT_NOT_UPDATED,
  COMMENTS_DELETED,
  COMMENTS_NOT_FOUND,
  COMMENT_NOT_CREATED,
  COMMENTS_NOT_DELETED,
  COMMENT_NOT_DELETED,
} = require('../../../helpers/constants/comments');

const getComments = async (req, res) => {
  const {
    total, comments, skip, limit,
  } = req.data;

  try {
    res.status(OK).json({
      total,
      comments,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getComment = async (req, res) => {
  const { comment, author } = req.data;

  try {
    res.status(OK).json({
      ...comment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteComments = async (req, res) => {
  try {
    const comments = await commentsDB.find({ deleted_at: null });

    if (!comments.length) {
      return req.data.responseWithError(NOT_FOUND, COMMENTS_NOT_FOUND);
    }

    const deletedComments = await commentsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedComments) {
      return req.data.responseWithError(CONFLICT, COMMENTS_NOT_DELETED);
    }

    res.status(OK).json({
      message: COMMENTS_DELETED,
      items: deletedComments.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteComment = async (req, res) => {
  const { author } = req.data;

  try {
    const deletedComment = await commentsDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedComment) {
      return req.data.responseWithError(CONFLICT, COMMENT_NOT_DELETED);
    }

    res.status(OK).json({
      ...deletedComment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateComment = async (req, res) => {
  const { author } = req.data;

  try {
    const updatedComment = await commentsDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.comment,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedComment) {
      return req.data.responseWithError(CONFLICT, COMMENT_NOT_UPDATED);
    }

    res.status(OK).json({
      ...updatedComment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const addComment = async (req, res) => {
  const { author } = req.data;

  try {
    const comment = await commentsDB.insert({
      ...req.data.comment,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!comment) {
      return req.data.responseWithError(CONFLICT, COMMENT_NOT_CREATED);
    }

    res.status(OK).json({
      ...comment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getComments,
  getComment,
  deleteComments,
  deleteComment,
  updateComment,
  addComment,
};
