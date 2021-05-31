const { productCategoriesDB, productFiltersDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { DESC } = require('../../../helpers/constants/queries');
const {
  productCategoriesNotFoundMessage,
  productCategoriesDeletedMessage,
  productCategoriesNotAddedInFiltersMessage,
} = require('../../../helpers/variables/product-categories');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getAddedProductCategory = async (req, res) => {
  const { newCategory: category } = req.data;

  try {
    const filter = await productFiltersDB.insert({
      category: category.category,
      filters: {},
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!filter) {
      return req.data.responseWithError(
        CONFLICT,
        productCategoriesNotAddedInFiltersMessage,
      );
    }

    res.status(OK).json(category);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getProductCategories = async (req, res) => {
  const { sort = DESC } = req.query;

  try {
    const total = await productCategoriesDB.count({ deleted_at: null });
    const categories = await productCategoriesDB.find(
      { deleted_at: null },
      {
        sort: {
          created_at: sort === DESC ? -1 : 1,
        },
      },
    );

    if (!categories) {
      req.data.responseWithError(NOT_FOUND, productCategoriesNotFoundMessage);
    }

    res.status(OK).json({
      total,
      categories,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getDeletedProductCategories = async (req, res) => {
  const { deletedCategories } = req.data;

  try {
    res.status(OK).json({
      message: productCategoriesDeletedMessage,
      items: deletedCategories.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getDeletedProductCategory = async (req, res) => {
  const { deletedCategory } = req.data;

  try {
    res.status(OK).json(deletedCategory);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  getAddedProductCategory,
  getProductCategories,
  getDeletedProductCategories,
  getDeletedProductCategory,
};
