const { commentSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { commentsDB, productsDB, usersDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');
const { purify } = require('../../../helpers/sanitize');

const getComments = async (req, res, next) => {
  const { product_id = '', sort = 'desc' } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  try {
    const query = { deleted_at: null };
    const options = {
      skip: Number(skip),
      limit: Number(limit),
      sort: {
        created_at: sort === 'desc' ? -1 : 1,
      },
    };

    if (product_id) {
      query.product_id = product_id;
    }

    const total = await commentsDB.count(query);
    const comments = await commentsDB.find(query, options);

    if (!comments) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się pobrać komentarzy.',
      );
    }

    const arrayOfIDs = comments
      .filter((comment) => comment.user_id)
      .map((comment) => comment.user_id);

    const users = await usersDB.find({ _id: { $in: arrayOfIDs } });

    const commentsWithUserInfo = comments.map((comment) => {
      const userInfo = {};

      if (!comment.user_id) {
        userInfo.author = 'Anonim';
        userInfo.author_image = '';
      } else {
        const { username, avatar } = users.find(
          (user) => user._id.toString() === comment.user_id,
        );

        userInfo.author = username;
        userInfo.author_image = avatar;
      }

      return {
        ...comment,
        ...userInfo,
      };
    });

    res.status(200).json({
      total,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
      comments: commentsWithUserInfo,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getComment = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(
    req.params,
  );

  if (paramsSchemaError) {
    return responseWithError(
      res,
      next,
      400,
      paramsSchemaError.details[0].message,
    );
  }

  try {
    const comment = await commentsDB.findOne({
      _id: params.id,
      deleted_at: null,
    });

    if (!comment || (comment && comment.deleted_at)) {
      return responseWithError(res, next, 404, 'Komentarz nie istnieje.');
    }

    const authorInfo = {
      author: 'Anonim',
      author_image: '',
    };

    if (req.user && req.user._id) {
      const user = await usersDB.findOne({ _id: req.user._id });

      if (user) {
        authorInfo.author = user.username;
        authorInfo.author_image = user.avatar;
      }
    }

    res.status(200).json({
      ...comment,
      ...authorInfo,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteComments = async (req, res, next) => {
  try {
    const comments = await commentsDB.find({ deleted_at: null });

    if (!comments.length) {
      return responseWithError(
        res,
        next,
        500,
        'W bazie danych nie ma żadnych komentarzy.',
      );
    }

    const deletedComments = await commentsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedComments) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć komentarza.',
      );
    }

    res.status(200).json({
      message: 'Usunięto wszystkie komentarze.',
      items: deletedComments.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteComment = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(
    req.params,
  );

  if (paramsSchemaError) {
    return responseWithError(
      res,
      next,
      400,
      paramsSchemaError.details[0].message,
    );
  }

  try {
    const comment = await commentsDB.findOne({ _id: params.id });

    if (!comment || (comment && comment.deleted_at)) {
      return responseWithError(res, next, 500, 'Komentarz nie istnieje.');
    }

    if (
      req.user._id !== comment.user_id
      || req.user.roles.indexOf('administrator') === -1
    ) {
      return responseWithError(res, next, 500, 'Brak dostępu.');
    }

    const authorInfo = {
      author: 'Anonim',
      author_image: '',
    };

    if (req.user && req.user._id) {
      const user = await usersDB.findOne({ _id: req.user._id });

      if (user) {
        authorInfo.author = user.username;
        authorInfo.author_image = user.avatar;
      }
    }

    const deletedComment = await commentsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedComment) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć komentarza.',
      );
    }

    res.status(200).json({
      ...deletedComment,
      ...authorInfo,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateComment = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(
    req.params,
  );

  if (paramsSchemaError) {
    return responseWithError(
      res,
      next,
      400,
      paramsSchemaError.details[0].message,
    );
  }

  try {
    const comment = await commentsDB.findOne({ _id: params.id });

    if (!comment || (comment && comment.deleted_at)) {
      return responseWithError(res, next, 500, 'Komentarz nie istnieje.');
    }

    if (req.user._id !== comment.user_id) {
      return responseWithError(
        res,
        next,
        500,
        'Nie można edytować anonimowych komentarzy.',
      );
    }

    const body = {
      ...req.body,
      user_id: comment.user_id,
    };

    const { schemaError, data } = commentSchema(body, false, false);

    if (schemaError) {
      return responseWithError(res, next, 400, schemaError.details[0].message);
    }

    data.purify_content = purify(data.content);

    const product = await productsDB.findOne({
      _id: data.product_id,
      deleted_at: null,
    });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(
        res,
        next,
        404,
        'Nie możesz zaktualizować komentarza w produkcie który nie istnieje.',
      );
    }

    const authorInfo = {
      author: 'Anonim',
      author_image: '',
    };

    if (req.user && req.user._id) {
      const user = await usersDB.findOne({
        _id: req.user._id,
        deleted_at: null,
      });

      if (!user || (user && user.deleted_at)) {
        return responseWithError(
          res,
          next,
          404,
          'Nie możesz zaktualizować komentarza ponieważ użytkownik o podanym numerze ID nie istnieje.',
        );
      }

      if (user) {
        authorInfo.author = user.username;
        authorInfo.author_image = user.avatar;
      }
    }

    const updatedComment = await commentsDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedComment) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować komentarza.',
      );
    }

    res.status(200).json({
      ...updatedComment,
      ...authorInfo,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const addComment = async (req, res, next) => {
  const body = {
    ...req.body,
    user_id: req.user && req.user._id ? req.user._id : '',
  };

  const { schemaError, data } = commentSchema(body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const product = await productsDB.findOne({
      _id: data.product_id,
      deleted_at: null,
    });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(
        res,
        next,
        404,
        'Nie możesz dodać komentarza do produktu który nie istnieje.',
      );
    }

    const authorInfo = {
      author: 'Anonim',
      author_image: '',
    };

    if (req.user && req.user._id) {
      const user = await usersDB.findOne({
        _id: req.user._id,
        deleted_at: null,
      });

      if (!user || (user && user.deleted_at)) {
        return responseWithError(
          res,
          next,
          404,
          'Nie możesz dodać komentarza ponieważ użytkownik o podanym numerze ID nie istnieje.',
        );
      }

      if (user) {
        authorInfo.author = user.username;
        authorInfo.author_image = user.avatar;
      }
    }

    const comment = await commentsDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!comment) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się dodać komentarza.',
      );
    }

    res.status(200).json({
      ...comment,
      ...authorInfo,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
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
