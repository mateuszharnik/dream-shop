const fs = require('fs');
const sharp = require('sharp');
const productSchema = require('./index.model');
const convertCategory = require('../../../helpers/product-categories');
const { dbIdRegExp } = require('../../../helpers/regexp');
const { purify } = require('../../../helpers/sanitize');
const { getThumbnailUrl } = require('../../../helpers/files');
const { thumbnailFileSchema, galleryFileSchema } = require('../../../models');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { DESC } = require('../../../helpers/variables/constants/queries');
const { PRODUCTS_URL } = require('../../../helpers/variables/constants/url');
const {
  filtersNotUpdatedMessage,
} = require('../../../helpers/variables/product-filters');
const {
  categoryIsForbiddenMessage,
  productCategoryNotExistMessage,
  productCategoryNotUpdatedMessage,
} = require('../../../helpers/variables/product-categories');
const {
  productsDB,
  productCategoriesDB,
  productFiltersDB,
} = require('../../../db');
const {
  productNotUpdatedMessage,
  productNotAddedMessage,
  productsNotDeletedMessage,
  productNotFoundMessage,
  productNotDeletedMessage,
  productsNotFoundMessage,
} = require('../../../helpers/variables/products');
const {
  productImageNewHeight,
  productImageNewWidth,
} = require('../../../helpers/variables/files');
const {
  PRODUCTS_DIR,
} = require('../../../helpers/variables/constants/directories');
const {
  JPEG,
  JPEG_EXT,
} = require('../../../helpers/variables/constants/types');
const {
  BESTSELLERS_PL,
  NEWS_PL,
  POPULARITY_PL,
  PRICE_PL,
  ALPHABET_PL,
  COMPANY_NAME,
} = require('../../../helpers/variables/constants/products');
const {
  CONFLICT,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const timeout = 100;

const validateProduct = (req, res, next) => {
  const { schemaError, data: product } = productSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  product.purify_description = purify(product.description);

  req.data.validatedProduct = product;

  next();
};

const getProductQueries = (req, res, next) => {
  const {
    category = '',
    search = '',
    cart = '',
    available = false,
  } = req.query;

  const query = {
    deleted_at: null,
  };

  if (available) {
    query.quantity = { $gt: 0 };
  }

  const categoryNameIsCorrect = category !== BESTSELLERS_PL
    && category !== convertCategory(NEWS_PL);

  if (category && categoryNameIsCorrect) {
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
    ];
  }

  req.data.query = query;

  next();
};

const getSortQueries = (req, res, next) => {
  const { category = '', sort = '', sortType = DESC } = req.query;

  const sortQuery = {};

  if (sort === PRICE_PL) {
    sortQuery.price = sortType === DESC ? -1 : 1;
  } else if (sort === ALPHABET_PL) {
    sortQuery.name = sortType === DESC ? -1 : 1;
  } else if (sort === convertCategory(POPULARITY_PL)) {
    sortQuery.views = sortType === DESC ? -1 : 1;
  }

  if (category === BESTSELLERS_PL) {
    sortQuery.selled = -1;
  } else if (category === convertCategory(NEWS_PL)) {
    sortQuery.created_at = -1;
  }

  req.data.sort = sortQuery;

  next();
};

const checkIfCategoryExist = (req, res, next) => {
  if (req.body.category) {
    return req.data.responseWithError(CONFLICT, categoryIsForbiddenMessage);
  }

  if (req.body.category_name && typeof req.body.category_name === 'string') {
    req.body.category = convertCategory(req.body.category_name);
  }

  next();
};

const replaceThumbnail = async (req, res, next) => {
  try {
    if (!(req.files && req.files.thumbnail && req.files.thumbnail[0])) {
      return next();
    }

    const { schemaError, data: file } = thumbnailFileSchema(
      req.files.thumbnail[0],
    );

    if (schemaError) {
      return req.data.responseWithError(
        CONFLICT,
        schemaError.details[0].message,
      );
    }

    const fileName = file.filename.replace(/\..+$/, JPEG_EXT);
    const filePath = file.path.replace(/\..+$/, JPEG_EXT);

    await sharp(file.path)
      .toFormat(JPEG)
      .resize(productImageNewWidth, productImageNewHeight)
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

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const replaceGallery = (inGallery = false) => async (req, res, next) => {
  if (!inGallery) {
    req.body.gallery = [];
  }

  if (inGallery && !req.body.gallery) {
    req.body.gallery = [];
  }

  if (inGallery && !Array.isArray(req.body.gallery)) {
    req.body.gallery = [req.body.gallery];
  }

  try {
    if (inGallery && !req.body.gallery.length) {
      req.body.gallery = [];
    }

    if (!(req.files && req.files.gallery && req.files.gallery.length)) {
      return next();
    }

    const { schemaError, data: files } = galleryFileSchema(req.files.gallery);

    if (schemaError) {
      return req.data.responseWithError(
        CONFLICT,
        schemaError.details[0].message,
      );
    }

    await Promise.all(
      files.map(async (file) => {
        const fileName = file.filename.replace(/\..+$/, JPEG_EXT);
        const filePath = file.path.replace(/\..+$/, JPEG_EXT);

        await sharp(file.path)
          .toFormat(JPEG)
          .resize(productImageNewWidth, productImageNewHeight)
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
      }),
    );

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = await productsDB.insert({
      ...req.data.validatedProduct,
      selled: 0,
      views: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!product) {
      return req.data.responseWithError(CONFLICT, productNotAddedMessage);
    }

    req.data.product = product;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const checkIfProductCategoryExist = async (req, res, next) => {
  const { product } = req.data;

  try {
    const category = await productCategoriesDB.findOne({
      category: product.category,
      deleted_at: null,
    });

    if (!category) {
      return req.data.responseWithError(
        NOT_FOUND,
        productCategoryNotExistMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findAndUpdateProductFiltersOnAdd = async (req, res, next) => {
  const { product } = req.data;

  try {
    const filter = await productFiltersDB.findOne({
      category: product.category,
      deleted_at: null,
    });

    Object.entries(product).forEach(([key, value]) => {
      if (key !== COMPANY_NAME) {
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
      return req.data.responseWithError(CONFLICT, filtersNotUpdatedMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateProductCategory = async (req, res, next) => {
  const { product } = req.data;

  try {
    const total = await productsDB.count({
      category: product.category,
      deleted_at: null,
    });

    const updatedCategory = await productCategoriesDB.findOneAndUpdate(
      { category: product.category },
      { $set: { count: total } },
    );

    if (!updatedCategory) {
      return req.data.responseWithError(
        CONFLICT,
        productCategoryNotUpdatedMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findProduct = async (req, res, next) => {
  try {
    const product = await productsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!product) {
      return req.data.responseWithError(NOT_FOUND, productNotFoundMessage);
    }

    req.data.product = product;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productsDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedProduct) {
      return req.data.responseWithError(CONFLICT, productNotDeletedMessage);
    }

    req.data.product = deletedProduct;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findAndUpdateProductFiltersOnDelete = (
  withCompareCategoryName = false,
) => async (req, res, next) => {
  const { product } = req.data;

  const compareCategoryName = product.category_name !== req.body.category_name
      || product.company_name !== req.body.company_name;

  if (withCompareCategoryName && !compareCategoryName) {
    return next();
  }

  try {
    const filter = await productFiltersDB.findOne({
      category: product.category,
      deleted_at: null,
    });

    if (Object.entries(filter.filters).length === 0) {
      return next();
    }

    Object.entries(product).forEach(([key, value]) => {
      if (key !== COMPANY_NAME) {
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
      return req.data.responseWithError(CONFLICT, filtersNotUpdatedMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteThumbnailAndGalleryFiles = async (req, res, next) => {
  const { product } = req.data;

  try {
    if (product.thumbnail) {
      const thumbnailName = product.thumbnail.replace(PRODUCTS_URL, '');
      const thumbnailDir = `${PRODUCTS_DIR}/${thumbnailName}`;

      if (fs.existsSync(thumbnailDir)) {
        fs.unlinkSync(thumbnailDir);
      }
    }

    if (product.gallery.length) {
      product.gallery.forEach((image) => {
        const imageName = image.replace(PRODUCTS_URL, '');
        const imageDir = `${PRODUCTS_DIR}/${imageName}`;

        if (fs.existsSync(imageDir)) {
          fs.unlinkSync(imageDir);
        }
      });
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findProducts = async (req, res, next) => {
  try {
    const products = await productsDB.find({ deleted_at: null });

    if (!products.length) {
      return req.data.responseWithError(NOT_FOUND, productsNotFoundMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteProducts = async (req, res, next) => {
  try {
    const deletedProducts = await productsDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return req.data.responseWithError(CONFLICT, productsNotDeletedMessage);
    }

    req.data.deletedProducts = deletedProducts;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteProductFilters = async (req, res, next) => {
  try {
    const updatedFilters = await productFiltersDB.update(
      {},
      { $set: { filters: [] } },
      { multi: true },
    );

    if (!updatedFilters) {
      return req.data.responseWithError(CONFLICT, filtersNotUpdatedMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteThumbnailAndGalleryDirectories = async (req, res, next) => {
  try {
    if (fs.existsSync(PRODUCTS_DIR)) {
      fs.rmdirSync(PRODUCTS_DIR, { recursive: true });

      setTimeout(() => {
        fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
      }, timeout);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteProductCategories = async (req, res, next) => {
  try {
    const categories = await productCategoriesDB.update(
      {},
      { $set: { count: 0 } },
      { multi: true },
    );

    if (!categories) {
      return req.data.responseWithError(
        CONFLICT,
        productCategoryNotUpdatedMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateProduct = async (req, res, next) => {
  const { validatedProduct } = req.data;

  try {
    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...validatedProduct,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedProduct) {
      return req.data.responseWithError(CONFLICT, productNotUpdatedMessage);
    }

    req.data.updatedProduct = updatedProduct;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findAndUpdateProductFiltersOnUpdate = async (req, res, next) => {
  const { product, updatedProduct } = req.data;

  try {
    const compareCategory = product.category !== updatedProduct.category
      || product.company_name !== updatedProduct.company_name;

    if (!compareCategory) {
      return next();
    }

    const filter = await productFiltersDB.findOne({
      category: updatedProduct.category,
      deleted_at: null,
    });

    Object.entries(updatedProduct).forEach(([key, value]) => {
      if (key !== COMPANY_NAME) {
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
      return req.data.responseWithError(CONFLICT, filtersNotUpdatedMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateThumbnail = async (req, res, next) => {
  const { product } = req.data;

  const isThumbnailExist = req.files
    && req.files.thumbnail
    && req.files.thumbnail[0]
    && product.thumbnail;

  if (!(isThumbnailExist || (product.thumbnail && !req.body.thumbnail))) {
    return next();
  }

  try {
    const thumbnailName = product.thumbnail.replace(PRODUCTS_URL, '');
    const thumbnailDir = `${PRODUCTS_DIR}/${thumbnailName}`;

    if (fs.existsSync(thumbnailDir)) {
      fs.unlinkSync(thumbnailDir);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateGallery = async (req, res, next) => {
  const { product } = req.data;

  const isGalleryExist = req.files
    && req.files.gallery
    && req.files.gallery.length
    && req.body.gallery.length === product.gallery.length;

  try {
    if (isGalleryExist || req.body.gallery.length < product.gallery.length) {
      const filteredArray = [...product.gallery];

      req.body.gallery.forEach((image) => {
        if (product.gallery.indexOf(image) !== -1) {
          filteredArray.splice(filteredArray.indexOf(image), 1);
        }
      });

      if (filteredArray.length) {
        filteredArray.forEach((image) => {
          const imageName = image.replace(PRODUCTS_URL, '');
          const imageDir = `${PRODUCTS_DIR}/${imageName}`;

          if (fs.existsSync(imageDir)) {
            fs.unlinkSync(imageDir);
          }
        });
      }
    }

    if (product.gallery.length && !req.body.gallery.length) {
      product.gallery.forEach((image) => {
        const imageName = image.replace(PRODUCTS_URL, '');
        const imageDir = `${PRODUCTS_DIR}/${imageName}`;

        if (fs.existsSync(imageDir)) {
          fs.unlinkSync(imageDir);
        }
      });
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  validateProduct,
  getProductQueries,
  getSortQueries,
  checkIfCategoryExist,
  replaceThumbnail,
  replaceGallery,
  addProduct,
  checkIfProductCategoryExist,
  findAndUpdateProductFiltersOnAdd,
  findAndUpdateProductFiltersOnDelete,
  updateProductCategory,
  findProduct,
  findProducts,
  deleteProduct,
  deleteProducts,
  deleteThumbnailAndGalleryFiles,
  deleteProductFilters,
  deleteThumbnailAndGalleryDirectories,
  deleteProductCategories,
  updateProduct,
  findAndUpdateProductFiltersOnUpdate,
  updateThumbnail,
  updateGallery,
};
