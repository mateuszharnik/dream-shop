const { commentsDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  commentNotUpdatedMessage,
  commentsDeletedMessage,
  commentsNotFoundMessage,
  commentNotCreatedMessage,
  commentsNotDeletedMessage,
  commentNotDeletedMessage,
} = require('../../../helpers/variables/comments');
const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
} = require('../../../helpers/constants/status-codes');

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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteComments = async (req, res) => {
  try {
    const comments = await commentsDB.find({ deleted_at: null });

    if (!comments.length) {
      return req.data.responseWithError(NOT_FOUND, commentsNotFoundMessage);
    }

    const deletedComments = await commentsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedComments) {
      return req.data.responseWithError(CONFLICT, commentsNotDeletedMessage);
    }

    res.status(OK).json({
      message: commentsDeletedMessage,
      items: deletedComments.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
      return req.data.responseWithError(CONFLICT, commentNotDeletedMessage);
    }

    res.status(OK).json({
      ...deletedComment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
      return req.data.responseWithError(CONFLICT, commentNotUpdatedMessage);
    }

    res.status(OK).json({
      ...updatedComment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
      return req.data.responseWithError(CONFLICT, commentNotCreatedMessage);
    }

    res.status(OK).json({
      ...comment,
      ...author,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
