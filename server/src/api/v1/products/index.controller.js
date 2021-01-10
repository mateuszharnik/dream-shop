const fs = require('fs');
const { productSchema } = require('./index.model');
const { dbIdSchema, thumbnailFileSchema, galleryFileSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { productsDB, productCategoriesDB } = require('../../../db');
const { addCategory } = require('../../../helpers/product-categories');
const { purify } = require('../../../helpers/sanitize');
const { getThumbnailUrl } = require('../../../helpers/files');

const getProducts = async (req, res, next) => {
  const {
    sortType = 'desc',
    category = '',
    sort = '',
    search = '',
    available = false,
  } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  const query = {
    deleted_at: null,
  };

  if (available) {
    query.quantity = { $gte: '0' };
  }

  if (category !== '' && category !== 'bestsellery') {
    const categories = category.split(',');
    if (categories.length > 1) {
      query.$or = [];

      categories.forEach((cat) => {
        query.$or.push({ category: cat });
      });
    } else {
      query.category = category;
    }
  }

  if (search !== '') {
    const regexp = new RegExp(`.*(${search.replace(' ', '|')}).*`, 'i');

    query.$or = [
      { name: regexp },
      { category: regexp },
      { company_name: regexp },
    ];
  }

  const sortQuery = {};

  if (sort === 'cena') {
    sortQuery.price = sortType === 'desc' ? -1 : 1;
  } else if (sort === 'alfabet') {
    sortQuery.name = sortType === 'desc' ? -1 : 1;
  } else if (category === 'bestsellery') {
    sortQuery.selled = -1;
  } else {
    sortQuery.created_at = sortType === 'desc' ? -1 : 1;
  }

  try {
    const options = {
      sort: sortQuery,
      collation: { locale: 'pl', numericOrdering: true },
    };

    const total = await productsDB.count({ deleted_at: null });
    const results = await productsDB.count(query, options);
    const products = await productsDB.find(query, {
      ...options,
      skip: Number(skip),
      limit: Number(limit),
    });

    if (!products) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać produktów.');
    }

    res.status(200).json({
      total,
      results,
      products,
      pagination: {
        skip,
        limit,
        remaining: results - (skip + limit) > 0,
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
  if (req.body.category) {
    return responseWithError(res, next, 400, 'Właściwość "category" jest niedozwolona.');
  }

  if (req.body.category_name && typeof req.body.category_name === 'string') {
    req.body.category = addCategory(req.body.category_name);
  }

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
      { category: product.category },
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
      { category: updatedProduct.category },
      { $set: { count: total } },
    );

    if (!category) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować liczby produktów w kategorii.');
    }

    if (product.thumbnail) {
      const thumbnailName = product.thumbnail.replace('http://localhost:3000/uploads/products/', '');
      const thumbnailDir = `uploads/products/${thumbnailName}`;

      if (fs.existsSync(thumbnailDir)) {
        fs.unlinkSync(thumbnailDir);
      }
    }

    if (product.gallery.length) {
      product.gallery.forEach((image) => {
        const imagelName = image.replace('http://localhost:3000/uploads/products/', '');
        const imagelDir = `uploads/products/${imagelName}`;

        if (fs.existsSync(imagelDir)) {
          fs.unlinkSync(imagelDir);
        }
      });
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

    const productsDir = 'uploads/products';

    if (fs.existsSync(productsDir)) {
      fs.rmdirSync(productsDir, { recursive: true });
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
  if (req.body.category) {
    return responseWithError(res, next, 400, 'Właściwość "category" jest niedozwolona.');
  }

  if (req.body.category_name && typeof req.body.category_name === 'string') {
    req.body.category = addCategory(req.body.category_name);
  }

  if (req.body.description) {
    req.body.description = purify(req.body.description);
  }

  if (!req.body.gallery) {
    req.body.gallery = [];
  }

  if (!Array.isArray(req.body.gallery)) {
    req.body.gallery = [req.body.gallery];
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

    files.forEach((file) => {
      req.body.gallery.push(getThumbnailUrl(file));
    });
  } else if (!req.body.gallery.length) {
    req.body.gallery = [];
  }

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

    if (
      (req.files && req.files.thumbnail && req.files.thumbnail[0] && product.thumbnail)
      || (product.thumbnail && !req.body.thumbnail)
    ) {
      const thumbnailName = product.thumbnail.replace('http://localhost:3000/uploads/products/', '');
      const thumbnailDir = `uploads/products/${thumbnailName}`;

      if (fs.existsSync(thumbnailDir)) {
        fs.unlinkSync(thumbnailDir);
      }
    }

    if ((req.files
      && req.files.gallery
      && req.files.gallery.length
      && req.body.gallery.length === product.gallery.length)
      || (req.body.gallery.length < product.gallery.length)) {
      const filteredArray = [...product.gallery];

      req.body.gallery.forEach((image) => {
        if (product.gallery.indexOf(image) !== -1) {
          filteredArray.splice(filteredArray.indexOf(image), 1);
        }
      });

      if (filteredArray.length) {
        filteredArray.forEach((image) => {
          const imagelName = image.replace('http://localhost:3000/uploads/products/', '');
          const imagelDir = `uploads/products/${imagelName}`;

          if (fs.existsSync(imagelDir)) {
            fs.unlinkSync(imagelDir);
          }
        });
      }
    }

    if (product.gallery.length && !req.body.gallery.length) {
      product.gallery.forEach((image) => {
        const imagelName = image.replace('http://localhost:3000/uploads/products/', '');
        const imagelDir = `uploads/products/${imagelName}`;

        if (fs.existsSync(imagelDir)) {
          fs.unlinkSync(imagelDir);
        }
      });
    }

    const total = await productsDB.count({ category: updatedProduct.category, deleted_at: null });
    const category = await productCategoriesDB.findOneAndUpdate(
      { category: updatedProduct.category },
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
