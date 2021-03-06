const fs = require('fs');
const sharp = require('sharp');
const { productSchema } = require('./index.model');
const { dbIdRegExp } = require('../../../helpers/regexp');
const {
  dbIdSchema,
  thumbnailFileSchema,
  galleryFileSchema,
} = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const {
  productsDB,
  productCategoriesDB,
  productFiltersDB,
} = require('../../../db');
const { addCategory } = require('../../../helpers/product-categories');
const { purify } = require('../../../helpers/sanitize');
const { getThumbnailUrl } = require('../../../helpers/files');

const getProducts = async (req, res, next) => {
  const {
    sortType = 'desc',
    category = '',
    sort = '',
    search = '',
    cart = '',
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

  if (category && category !== 'bestsellery') {
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

  if (cart) {
    const products = cart.split(',').filter((id) => dbIdRegExp.test(id));

    query._id = {
      $in: products,
    };
  }

  if (search) {
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

    const withPagination = !cart ? options : {
      ...options,
      skip: Number(skip),
      limit: Number(limit),
    };

    const total = await productsDB.count({ deleted_at: null });
    const results = await productsDB.count(query, options);
    const products = await productsDB.find(query, withPagination);

    if (!products) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się pobrać produktów.',
      );
    }

    const data = {
      total,
      results,
      products,
    };

    if (!cart) {
      data.pagination = {
        skip,
        limit,
        remaining: results - (skip + limit) > 0,
      };
    }

    res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getProduct = async (req, res, next) => {
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
    return responseWithError(
      res,
      next,
      400,
      'Właściwość "category" jest niedozwolona.',
    );
  }

  if (req.body.category_name && typeof req.body.category_name === 'string') {
    req.body.category = addCategory(req.body.category_name);
  }

  try {
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const { schemaError: fileSchemaError, data: file } = thumbnailFileSchema(
        req.files.thumbnail[0],
      );

      if (fileSchemaError) {
        return responseWithError(
          res,
          next,
          400,
          fileSchemaError.details[0].message,
        );
      }

      const fileName = file.filename.replace(/\..+$/, '.jpeg');
      const filePath = file.path.replace(/\..+$/, '.jpeg');

      await sharp(file.path)
        .toFormat('jpeg')
        .resize(900, 1200)
        .toFile(`${file.destination}/${fileName}`);

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      const newFile = {
        ...file,
        filename: fileName,
        path: filePath,
      };

      req.body.thumbnail = getThumbnailUrl(newFile);
    }

    if (req.files && req.files.gallery && req.files.gallery.length) {
      const { schemaError: fileSchemaError, data: files } = galleryFileSchema(
        req.files.gallery,
      );

      if (fileSchemaError) {
        return responseWithError(
          res,
          next,
          400,
          fileSchemaError.details[0].message,
        );
      }

      req.body.gallery = [];

      await Promise.all(files.map(async (file) => {
        const fileName = file.filename.replace(/\..+$/, '.jpeg');
        const filePath = file.path.replace(/\..+$/, '.jpeg');

        await sharp(file.path)
          .toFormat('jpeg')
          .resize(900, 1200)
          .toFile(`${file.destination}/${fileName}`);

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }

        const newFile = {
          ...file,
          filename: fileName,
          path: filePath,
        };

        req.body.gallery.push(getThumbnailUrl(newFile));
      }));
    } else {
      req.body.gallery = [];
    }

    const { schemaError, data } = productSchema(req.body, false, false);

    if (schemaError) {
      return responseWithError(res, next, 400, schemaError.details[0].message);
    }

    data.purify_description = purify(data.description);

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

    const category = await productCategoriesDB.findOne(
      { category: product.category },
    );

    if (!category || (category && category.deleted_at)) {
      return responseWithError(res, next, 500, 'Kategoria nie istnieje.');
    }

    const filter = await productFiltersDB.findOne({
      category: product.category,
      deleted_at: null,
    });

    Object.entries(product).forEach(([key, value]) => {
      if (key !== 'company_name') {
        return;
      }

      if (!Array.isArray(filter.filters[key])) {
        filter.filters[key] = [];
      }

      const index = filter.filters[key].findIndex(
        ({ name }) => name === product.company_name,
      );

      if (index === -1) {
        filter.filters[key].push({
          name: value,
          items: 1,
        });
      } else {
        const items = filter.filters[key][index].items + 1;

        filter.filters[key][index] = {
          name: value,
          items,
        };
      }
    });

    const updatedFilter = await productFiltersDB.findOneAndUpdate(
      { category: product.category, deleted_at: null },
      { $set: { filters: filter.filters, updated_at: new Date() } },
    );

    if (!updatedFilter) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować filtrów.',
      );
    }

    const total = await productsDB.count({
      category: product.category,
      deleted_at: null,
    });

    const updatedCategory = await productCategoriesDB.findOneAndUpdate(
      { category: product.category },
      { $set: { count: total } },
    );

    if (!updatedCategory) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować liczby produktów w kategorii.',
      );
    }

    res.status(200).json({ ...product });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteProduct = async (req, res, next) => {
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
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje.');
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedProduct) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć produktu.',
      );
    }

    const filter = await productFiltersDB.findOne({
      category: updatedProduct.category,
      deleted_at: null,
    });

    Object.entries(updatedProduct).forEach(([key, value]) => {
      if (key !== 'company_name') {
        return;
      }

      const index = filter.filters[key].findIndex(
        ({ name }) => name === updatedProduct.company_name,
      );

      if (index > -1) {
        const items = filter.filters[key][index].items - 1;

        filter.filters[key][index] = {
          name: value,
          items,
        };
      }

      if (!filter.filters[key][index].items) {
        filter.filters[key].splice(index, 1);
      }

      if (!filter.filters[key].length) {
        delete filter.filters[key];
      }
    });

    const updatedFilter = await productFiltersDB.findOneAndUpdate(
      { category: product.category, deleted_at: null },
      { $set: { filters: filter.filters, updated_at: new Date() } },
    );

    if (!updatedFilter) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować filtrów.',
      );
    }

    const total = await productsDB.count({
      category: updatedProduct.category,
      deleted_at: null,
    });
    const category = await productCategoriesDB.findOneAndUpdate(
      { category: updatedProduct.category },
      { $set: { count: total } },
    );

    if (!category) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować liczby produktów w kategorii.',
      );
    }

    if (product.thumbnail) {
      const thumbnailName = product.thumbnail.replace(
        'http://localhost:3000/uploads/products/',
        '',
      );
      const thumbnailDir = `uploads/products/${thumbnailName}`;

      if (fs.existsSync(thumbnailDir)) {
        fs.unlinkSync(thumbnailDir);
      }
    }

    if (product.gallery.length) {
      product.gallery.forEach((image) => {
        const imagelName = image.replace(
          'http://localhost:3000/uploads/products/',
          '',
        );
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
      return responseWithError(
        res,
        next,
        500,
        'W bazie danych nie ma żadnych produktów.',
      );
    }

    const deletedProducts = await productsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć produktów.',
      );
    }

    const updatedFilters = await productFiltersDB.update(
      {},
      { $set: { filters: [] } },
      { multi: true },
    );

    if (!updatedFilters) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować filtrów.',
      );
    }

    const productsDir = 'uploads/products';

    if (fs.existsSync(productsDir)) {
      fs.rmdirSync(productsDir, { recursive: true });

      setTimeout(() => {
        fs.mkdirSync(productsDir, { recursive: true });
      }, 100);
    }

    const categories = await productCategoriesDB.update(
      {},
      { $set: { count: 0 } },
      { multi: true },
    );

    if (!categories) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować liczby produktów w kategorii.',
      );
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
    return responseWithError(
      res,
      next,
      400,
      'Właściwość "category" jest niedozwolona.',
    );
  }

  if (req.body.category_name && typeof req.body.category_name === 'string') {
    req.body.category = addCategory(req.body.category_name);
  }

  if (!req.body.gallery) {
    req.body.gallery = [];
  }

  if (!Array.isArray(req.body.gallery)) {
    req.body.gallery = [req.body.gallery];
  }

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
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const { schemaError: fileSchemaError, data: file } = thumbnailFileSchema(
        req.files.thumbnail[0],
      );

      if (fileSchemaError) {
        return responseWithError(
          res,
          next,
          400,
          fileSchemaError.details[0].message,
        );
      }

      const fileName = file.filename.replace(/\..+$/, '.jpeg');
      const filePath = file.path.replace(/\..+$/, '.jpeg');

      await sharp(file.path)
        .toFormat('jpeg')
        .resize(900, 1200)
        .toFile(`${file.destination}/${fileName}`);

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      const newFile = {
        ...file,
        filename: fileName,
        path: filePath,
      };

      req.body.thumbnail = getThumbnailUrl(newFile);
    }

    if (req.files && req.files.gallery && req.files.gallery.length) {
      const { schemaError: fileSchemaError, data: files } = galleryFileSchema(
        req.files.gallery,
      );

      if (fileSchemaError) {
        return responseWithError(
          res,
          next,
          400,
          fileSchemaError.details[0].message,
        );
      }

      await Promise.all(files.map(async (file) => {
        const fileName = file.filename.replace(/\..+$/, '.jpeg');
        const filePath = file.path.replace(/\..+$/, '.jpeg');

        await sharp(file.path)
          .toFormat('jpeg')
          .resize(900, 1200)
          .toFile(`${file.destination}/${fileName}`);

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }

        const newFile = {
          ...file,
          filename: fileName,
          path: filePath,
        };

        req.body.gallery.push(getThumbnailUrl(newFile));
      }));
    } else if (!req.body.gallery.length) {
      req.body.gallery = [];
    }

    const { schemaError, data } = productSchema(req.body, false, false);

    if (schemaError) {
      return responseWithError(res, next, 400, schemaError.details[0].message);
    }

    data.purify_description = purify(data.description);

    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje.');
    }

    const category = await productCategoriesDB.findOne(
      { category: product.category },
    );

    if (!category || (category && category.deleted_at)) {
      return responseWithError(res, next, 500, 'Kategoria nie istnieje.');
    }

    if (
      product.category_name !== req.body.category_name
      || product.company_name !== req.body.company_name
    ) {
      const filter = await productFiltersDB.findOne({
        category: product.category,
        deleted_at: null,
      });

      Object.entries(product).forEach(([key, value]) => {
        if (key !== 'company_name') {
          return;
        }

        const index = filter.filters[key].findIndex(
          ({ name }) => name === product.company_name,
        );

        if (index > -1) {
          const items = filter.filters[key][index].items - 1;

          filter.filters[key][index] = {
            name: value,
            items,
          };
        }

        if (!filter.filters[key][index].items) {
          filter.filters[key].splice(index, 1);
        }

        if (!filter.filters[key].length) {
          delete filter.filters[key];
        }
      });

      const updatedFilter = await productFiltersDB.findOneAndUpdate(
        { category: product.category, deleted_at: null },
        { $set: { filters: filter.filters, updated_at: new Date() } },
      );

      if (!updatedFilter) {
        return responseWithError(
          res,
          next,
          500,
          'Nie udało się zaktualizować filtrów.',
        );
      }
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
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować produktu.',
      );
    }

    if (
      product.category !== updatedProduct.category
      || product.company_name !== updatedProduct.company_name
    ) {
      const filter = await productFiltersDB.findOne({
        category: updatedProduct.category,
        deleted_at: null,
      });

      Object.entries(updatedProduct).forEach(([key, value]) => {
        if (key !== 'company_name') {
          return;
        }

        if (!Array.isArray(filter.filters[key])) {
          filter.filters[key] = [];
        }

        const index = filter.filters[key].findIndex(
          ({ name }) => name === updatedProduct.company_name,
        );

        if (index === -1) {
          filter.filters[key].push({
            name: value,
            items: 1,
          });
        } else {
          const items = filter.filters[key][index].items + 1;

          filter.filters[key][index] = {
            name: value,
            items,
          };
        }
      });

      const updatedFilter = await productFiltersDB.findOneAndUpdate(
        { category: updatedProduct.category, deleted_at: null },
        { $set: { filters: filter.filters, updated_at: new Date() } },
      );

      if (!updatedFilter) {
        return responseWithError(
          res,
          next,
          500,
          'Nie udało się zaktualizować filtrów.',
        );
      }
    }

    if (
      (req.files
        && req.files.thumbnail
        && req.files.thumbnail[0]
        && product.thumbnail)
      || (product.thumbnail && !req.body.thumbnail)
    ) {
      const thumbnailName = product.thumbnail.replace(
        'http://localhost:3000/uploads/products/',
        '',
      );
      const thumbnailDir = `uploads/products/${thumbnailName}`;

      if (fs.existsSync(thumbnailDir)) {
        fs.unlinkSync(thumbnailDir);
      }
    }

    if (
      (req.files
        && req.files.gallery
        && req.files.gallery.length
        && req.body.gallery.length === product.gallery.length)
      || req.body.gallery.length < product.gallery.length
    ) {
      const filteredArray = [...product.gallery];

      req.body.gallery.forEach((image) => {
        if (product.gallery.indexOf(image) !== -1) {
          filteredArray.splice(filteredArray.indexOf(image), 1);
        }
      });

      if (filteredArray.length) {
        filteredArray.forEach((image) => {
          const imagelName = image.replace(
            'http://localhost:3000/uploads/products/',
            '',
          );
          const imagelDir = `uploads/products/${imagelName}`;

          if (fs.existsSync(imagelDir)) {
            fs.unlinkSync(imagelDir);
          }
        });
      }
    }

    if (product.gallery.length && !req.body.gallery.length) {
      product.gallery.forEach((image) => {
        const imagelName = image.replace(
          'http://localhost:3000/uploads/products/',
          '',
        );
        const imagelDir = `uploads/products/${imagelName}`;

        if (fs.existsSync(imagelDir)) {
          fs.unlinkSync(imagelDir);
        }
      });
    }

    const total = await productsDB.count({
      category: updatedProduct.category,
      deleted_at: null,
    });

    const updatedCategory = await productCategoriesDB.findOneAndUpdate(
      { category: updatedProduct.category },
      { $set: { count: total } },
    );

    if (!updatedCategory) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować liczby produktów w kategorii.',
      );
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
