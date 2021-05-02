const { productsDB } = require('../../../db');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const { LOCALE_PL } = require('../../../helpers/constants/queries');
const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');
const {
  PRODUCT_NOT_FOUND,
  PRODUCTS_NOT_FOUND,
  PRODUCTS_DELETED,
} = require('../../../helpers/constants/products');

const getProducts = async (req, res) => {
  const { cart = '' } = req.query;
  const {
    skip, limit, query, sort,
  } = req.data;

  try {
    const options = {
      sort,
      collation: { locale: LOCALE_PL, numericOrdering: true },
    };

    const productsOptions = !cart
      ? options
      : {
        ...options,
        skip,
        limit,
      };

    const total = await productsDB.count({ deleted_at: null });
    const results = await productsDB.count(query, options);
    const products = await productsDB.find(query, productsOptions);

    if (!products) {
      return req.data.responseWithError(NOT_FOUND, PRODUCTS_NOT_FOUND);
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

    res.status(OK).json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!product) {
      return req.data.responseWithError(NOT_FOUND, PRODUCT_NOT_FOUND);
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { views: product.views + 1 } },
    );

    res.status(OK).json(updatedProduct);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getAddedProduct = async (req, res) => {
  const { product } = req.data;

  try {
    res.status(OK).json(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getDeletedProduct = async (req, res) => {
  const { product } = req.data;

  try {
    res.status(OK).json(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getDeletedProducts = async (req, res) => {
  const { deletedProducts } = req.data;

  try {
    res.status(OK).json({
      message: PRODUCTS_DELETED,
      items: deletedProducts.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getUpdatedProduct = async (req, res) => {
  const { updatedProduct } = req.data;

  try {
    res.status(OK).json(updatedProduct);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getAddedProduct,
  getUpdatedProduct,
  getDeletedProduct,
  getDeletedProducts,
};
