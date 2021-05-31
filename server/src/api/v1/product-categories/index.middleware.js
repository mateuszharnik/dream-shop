const productCategorySchema = require('./index.model');
const convertCategory = require('../../../helpers/product-categories');
const { productCategoriesRegExp } = require('../../../helpers/regexp');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  productCategoriesDB,
  productsDB,
  productFiltersDB,
} = require('../../../db');
const {
  productCategoriesNotFoundMessage,
  categoryIsForbiddenMessage,
  productCategoryNotExistMessage,
  categoryCannotBeDeletedMessage,
  productCategoriesNotDeletedMessage,
  productWithCategoryNotDeletedMessage,
  productCategoriesNotDeletedInFiltersMessage,
  productCategoryAlreadyExistMessage,
  productCategoryNotAddedMessage,
} = require('../../../helpers/variables/product-categories');
const {
  BESTSELLERS_PL,
  NEWS_PL,
} = require('../../../helpers/variables/constants/products');
const {
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const validateProductCategory = (req, res, next) => {
  if (req.body.category) {
    return req.data.responseWithError(CONFLICT, categoryIsForbiddenMessage);
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
        productCategoriesNotFoundMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const findCategory = async (req, res, next) => {
  try {
    const category = await productCategoriesDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!category) {
      return req.data.responseWithError(
        NOT_FOUND,
        productCategoryNotExistMessage,
      );
    }

    req.data.category = category;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        productCategoryAlreadyExistMessage,
      );
    }

    req.data.category = category;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const checkIfCategoryCanBeDeleted = (req, res, next) => {
  const { category } = req.data;

  const categoryNameIsCorrect = category.category === BESTSELLERS_PL
    || category.category === convertCategory(NEWS_PL);

  if (category && categoryNameIsCorrect) {
    return req.data.responseWithError(CONFLICT, categoryCannotBeDeletedMessage);
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
        productCategoriesNotDeletedMessage,
      );
    }

    req.data.deletedCategory = deletedCategory;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        productWithCategoryNotDeletedMessage,
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        productCategoriesNotDeletedInFiltersMessage,
      );
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
        productCategoriesNotDeletedMessage,
      );
    }

    req.data.deletedCategories = deletedCategories;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
      return req.data.responseWithError(
        CONFLICT,
        productCategoryNotAddedMessage,
      );
    }

    req.data.newCategory = newCategory;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
