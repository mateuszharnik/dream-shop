const { productSchema } = require('./index.model');
const { dbIdSchema, thumbnailFileSchema, galleryFileSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { productsDB, productCategoriesDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');
const { getThumbnailUrl } = require('../../../helpers/files');

const getProducts = async (req, res, next) => {
  const { sort = 'desc' } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  try {
    const total = await productsDB.count({ deleted_at: null });
    const products = await productsDB.find({ deleted_at: null }, {
      skip: Number(skip),
      limit: Number(limit),
      sort: {
        created_at: sort === 'desc' ? -1 : 1,
      },
    });

    if (!products) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać produktów.');
    }

    res.status(200).json({
      total,
      products,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 404, 'Produkt nie istnieje.');
    }

    res.status(200).json({ ...product });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const addProduct = async (req, res, next) => {
  if (req.body.description) {
    req.body.description = purify(req.body.description);
  }

  if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
    const {
      schemaError: fileSchemaError,
      data: file,
    } = thumbnailFileSchema(req.files.thumbnail[0]);

    if (fileSchemaError) {
      return responseWithError(res, next, 400, fileSchemaError.details[0].message);
    }

    req.body.thumbnail = getThumbnailUrl(file);
  }

  if (req.files && req.files.gallery && req.files.gallery.length) {
    const {
      schemaError: fileSchemaError,
      data: files,
    } = galleryFileSchema(req.files.gallery);

    if (fileSchemaError) {
      return responseWithError(res, next, 400, fileSchemaError.details[0].message);
    }

    req.body.gallery = [];

    files.forEach((file) => {
      req.body.gallery.push(getThumbnailUrl(file));
    });
  } else {
    req.body.gallery = [];
  }

  const { schemaError, data } = productSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const product = await productsDB.insert({
      ...data,
      selled: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!product) {
      return responseWithError(res, next, 500, 'Nie udało się dodać produktu.');
    }

    const total = await productsDB.count({ category: product.category, deleted_at: null });
    const category = await productCategoriesDB.findOneAndUpdate(
      { name: product.category },
      { $set: { count: total } },
    );

    if (!category) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować liczby produktów w kategorii.');
    }

    res.status(200).json({ ...product });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje.');
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedProduct) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć produktu.');
    }

    const total = await productsDB.count({ category: updatedProduct.category, deleted_at: null });
    const category = await productCategoriesDB.findOneAndUpdate(
      { name: updatedProduct.category },
      { $set: { count: total } },
    );

    if (!category) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować liczby produktów w kategorii.');
    }

    res.status(200).json({ ...updatedProduct });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteProducts = async (req, res, next) => {
  try {
    const products = await productsDB.find({ deleted_at: null });

    if (!products.length) {
      return responseWithError(res, next, 500, 'W bazie danych nie ma żadnych produktów.');
    }

    const deletedProducts = await productsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć produktów.');
    }

    const categories = await productCategoriesDB.update(
      {},
      { $set: { count: 0 } },
      { multi: true },
    );

    if (!categories) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować liczby produktów w kategorii.');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie produkty.',
      items: deletedProducts.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = productSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje.');
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedProduct) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować produktu.');
    }

    const total = await productsDB.count({ category: updatedProduct.category, deleted_at: null });
    const category = await productCategoriesDB.findOneAndUpdate(
      { name: updatedProduct.category },
      { $set: { count: total } },
    );

    if (!category) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować liczby produktów w kategorii.');
    }

    res.status(200).json({ ...updatedProduct });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
};
