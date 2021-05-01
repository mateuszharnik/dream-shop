const productCategorySchema = require('./index.model');
const convertCategory = require('../../../helpers/product-categories');
const {
  productCategoriesDB,
  productsDB,
  productFiltersDB,
} = require('../../../db');
const { productCategoriesRegExp } = require('../../../helpers/regexp');
const { BESTSELLERS, NEWS } = require('../../../helpers/constants/products');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');
const {
  PRODUCT_CATEGORIES_NOT_FOUND,
  CATEGORY_IS_FORBIDDEN,
  PRODUCT_CATEGORY_NOT_EXIST,
  CATEGORY_CANNOT_BE_DELETED,
  PRODUCT_CATEGORIES_NOT_DELETED,
  PRODUCT_WITH_CATEGORY_NOT_DELETED,
  PRODUCT_CATEGORIES_NOT_DELETED_IN_FILTERS,
  PRODUCT_CATEGORY_ALREADY_EXIST,
  PRODUCT_CATEGORY_NOT_ADDED,
} = require('../../../helpers/constants/product-categories');

const validateProductCategory = (req, res, next) => {
  if (req.body.category) {
    return req.data.responseWithError(CONFLICT, CATEGORY_IS_FORBIDDEN);
  }

  if (req.body.name && typeof req.body.name === 'string') {
    req.body.category = convertCategory(req.body.name);
  }

  const { schemaError, data: productCategory } = productCategorySchema(
    req.body,
  );

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.productCategory = productCategory;

  next();
};

const findCategories = async (req, res, next) => {
  try {
    const categories = await productCategoriesDB.find({
      $and: [
        { deleted_at: null },
        { category: { $not: productCategoriesRegExp } },
      ],
    });

    if (!categories.length) {
      return req.data.responseWithError(
        NOT_FOUND,
        PRODUCT_CATEGORIES_NOT_FOUND,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const findCategory = async (req, res, next) => {
  try {
    const category = await productCategoriesDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!category) {
      return req.data.responseWithError(NOT_FOUND, PRODUCT_CATEGORY_NOT_EXIST);
    }

    req.data.category = category;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const findCategoryByName = async (req, res, next) => {
  const { productCategory } = req.data;

  try {
    const category = await productCategoriesDB.findOne({
      $or: [
        { name: productCategory.name },
        { category: productCategory.category },
      ],
    });

    if (category && category.deleted_at === null) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_CATEGORY_ALREADY_EXIST,
      );
    }

    req.data.category = category;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkIfCategoryCanBeDeleted = (req, res, next) => {
  const { category } = req.data;

  const categoryNameIsCorrect = category.category === BESTSELLERS
    || category.category === convertCategory(NEWS);

  if (category && categoryNameIsCorrect) {
    return req.data.responseWithError(CONFLICT, CATEGORY_CANNOT_BE_DELETED);
  }

  next();
};

const deleteProductCategory = async (req, res, next) => {
  try {
    const deletedCategory = await productCategoriesDB.findOneAndUpdate(
      { _id: req.params.id, deleted_at: null },
      { $set: { deleted_at: new Date(), count: 0 } },
    );

    if (!deletedCategory) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_CATEGORIES_NOT_DELETED,
      );
    }

    req.data.deletedCategory = deletedCategory;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteProducts = (deleteAll = false) => async (req, res, next) => {
  const { deletedCategory } = req.data;
  const query = {};

  if (!deleteAll) {
    query.category = deletedCategory.name;
  }

  try {
    const deletedProducts = await productsDB.update(
      query,
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_WITH_CATEGORY_NOT_DELETED,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteProductFilters = (deleteAll = false) => async (req, res, next) => {
  const { deletedCategory } = req.data;
  const query = {};

  if (!deleteAll) {
    query.category = deletedCategory.name;
  }

  try {
    const deletedFilters = await productFiltersDB.update(
      query,
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedFilters) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_CATEGORIES_NOT_DELETED_IN_FILTERS,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteProductCategories = async (req, res, next) => {
  try {
    const deletedCategories = await productCategoriesDB.update(
      {
        $and: [
          { deleted_at: null },
          { category: { $not: productCategoriesRegExp } },
        ],
      },
      { $set: { deleted_at: new Date(), count: 0 } },
      { multi: true },
    );

    if (!deletedCategories) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_CATEGORIES_NOT_DELETED,
      );
    }

    req.data.deletedCategories = deletedCategories;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const addProductCategory = async (req, res, next) => {
  const { category, productCategory } = req.data;

  try {
    let newCategory = null;

    if (category && category.deleted_at) {
      newCategory = await productCategoriesDB.findOneAndUpdate(
        { name: productCategory.name },
        {
          $set: {
            count: 0,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        },
      );
    } else {
      newCategory = await productCategoriesDB.insert({
        ...productCategory,
        count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (!newCategory) {
      return req.data.responseWithError(CONFLICT, PRODUCT_CATEGORY_NOT_ADDED);
    }

    req.data.newCategory = newCategory;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  validateProductCategory,
  findCategories,
  findCategory,
  checkIfCategoryCanBeDeleted,
  deleteProductCategory,
  deleteProducts,
  deleteProductFilters,
  deleteProductCategories,
  findCategoryByName,
  addProductCategory,
};
