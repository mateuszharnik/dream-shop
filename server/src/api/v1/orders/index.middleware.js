const orderSchema = require('./index.model');
const { ordersDB, productsDB } = require('../../../db');
const { CONFLICT } = require('../../../helpers/constants/status-codes');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');
const {
  ORDER_NOT_FOUND,
} = require('../../../helpers/constants/orders');
const {
  PRODUCTS_NOT_UPDATED,
  NAME,
  PRICE,
  THUMBNAIL,
  COMPANY_NAME,
  CATEGORY_NAME,
  PRODUCT_WITH_ID_NOT_EXIST,
  PRODUCT_WITH_ID_NO_ENOUGHT_QUANTITY,
  PRODUCT_WITH_ID_CHANGED,
} = require('../../../helpers/constants/products');

const validateOrder = (req, res, next) => {
  req.body.isPaid = false;

  const { schemaError, data: order } = orderSchema(req.body);

  if (schemaError) {
    return req.data.responseWithError(CONFLICT, schemaError.details[0].message);
  }

  req.data.order = order;

  next();
};

const findOrder = async (req, res, next) => {
  try {
    const order = await ordersDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!order) {
      return req.data.responseWithError(NOT_FOUND, ORDER_NOT_FOUND);
    }

    req.data.order = order;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const findProducts = async (req, res, next) => {
  const { order } = req.data;

  try {
    const arrayOfIDs = order.products.map((product) => product._id);

    const products = await productsDB.find({
      _id: { $in: arrayOfIDs },
      deleted_at: null,
    });

    req.data.products = products;
    req.data.arrayOfIDs = arrayOfIDs;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateProducts = (withModifiedCount = false) => async (req, res, next) => {
  const { order, products } = req.data;

  try {
    const updatedProductsArray = products.reduce((array, product) => {
      const index = order.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      array.push({
        updateOne: {
          filter: { _id: product._id },
          update: {
            $set: {
              quantity: product.quantity - order.products[index].quantity,
              updated_at: new Date(),
            },
          },
        },
      });

      return array;
    }, []);

    const updatedProducts = await productsDB.bulkWrite(updatedProductsArray);

    if (withModifiedCount && updatedProducts.modifiedCount !== order.products.length) {
      return req.data.responseWithError(CONFLICT, PRODUCTS_NOT_UPDATED);
    }

    if (!withModifiedCount && !updatedProducts) {
      return req.data.responseWithError(CONFLICT, PRODUCTS_NOT_UPDATED);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkExistingProducts = async (req, res, next) => {
  const { arrayOfIDs, products } = req.data;

  try {
    const notExistingProducts = arrayOfIDs.reduce((array, id) => {
      const index = products.findIndex(
        (product) => product._id.toString() === id,
      );

      if (index === -1) {
        array.push(id);
      }

      return array;
    }, []);

    if (notExistingProducts.length) {
      return req.data.responseWithError(
        NOT_FOUND,
        PRODUCT_WITH_ID_NOT_EXIST(notExistingProducts[0]),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkEnoughProductsQuantity = async (req, res, next) => {
  const { products } = req.data;

  try {
    const notEnoughProductsQuantity = products.reduce((array, product) => {
      const index = req.data.order.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      if (product.quantity < req.data.order.products[index].quantity) {
        array.push(product);
      }

      return array;
    }, []);

    if (notEnoughProductsQuantity.length) {
      return req.data.responseWithError(
        NOT_FOUND,
        PRODUCT_WITH_ID_NO_ENOUGHT_QUANTITY(notEnoughProductsQuantity[0].name),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const checkChangedProducts = async (req, res, next) => {
  const { products } = req.data;

  try {
    const changedProducts = products.reduce((array, product) => {
      const index = req.data.order.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      const propsArr = [NAME, PRICE, THUMBNAIL, COMPANY_NAME, CATEGORY_NAME];

      propsArr.every((prop) => {
        if (product[prop] !== req.data.order.products[index][prop]) {
          array.push(product);
          return false;
        }

        return true;
      });

      return array;
    }, []);

    if (changedProducts.length) {
      return req.data.responseWithError(
        CONFLICT,
        PRODUCT_WITH_ID_CHANGED(changedProducts[0].name),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  validateOrder,
  findOrder,
  findProducts,
  updateProducts,
  checkEnoughProductsQuantity,
  checkExistingProducts,
  checkChangedProducts,
};
