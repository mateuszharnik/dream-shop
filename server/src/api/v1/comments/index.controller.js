const { commentSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { commentsDB, productsDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');
const { purify } = require('../../../helpers/sanitize');

const getComments = async (req, res, next) => {
  const { product_id = '' } = req.query;

  try {
    const query = { deleted_at: null };

    if (product_id) {
      query.product_id = product_id;
    }

    const comments = await commentsDB.find(query, {
      sort: {
        created_at: -1,
      },
    });

    if (!comments) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się pobrać komentarzy.',
      );
    }

    res.status(200).json(comments);
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

    res.status(200).json(comment);
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
      return responseWithError(res, next, 500, 'Nie udało się usunąć komentarza.');
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

    const deletedComment = await commentsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedComment) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć komentarza.');
    }

    res.status(200).json(deletedComment);
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

  const { schemaError, data } = commentSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const product = await productsDB.findOne({ _id: data.product_id, deleted_at: null });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(
        res,
        next,
        404,
        'Nie możesz zaktualizować komentarza w produkcie który nie istnieje.',
      );
    }

    const comment = await commentsDB.findOne({ _id: params.id });

    if (!comment || (comment && comment.deleted_at)) {
      return responseWithError(res, next, 500, 'Komentarz nie istnieje.');
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

    res.status(200).json(updatedComment);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const addComment = async (req, res, next) => {
  const { schemaError, data } = commentSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const product = await productsDB.findOne({ _id: data.product_id, deleted_at: null });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(
        res,
        next,
        404,
        'Nie możesz dodać komentarza do produktu który nie istnieje.',
      );
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

    res.status(200).json(comment);
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
