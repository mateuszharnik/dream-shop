const orderSchema = require('./index.model');
const { ordersDB, productsDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { orderNotFoundMessage } = require('../../../helpers/variables/orders');
const {
  productsNotUpdatedMessage,
  getProductWithIdNotExistMessage,
  getProductWithIdNoEnoughQuantityMessage,
  getProductWithIdChangedMessage,
} = require('../../../helpers/variables/products');
const {
  CONFLICT,
} = require('../../../helpers/variables/constants/status-codes');
const {
  NAME,
  PRICE,
  THUMBNAIL,
  COMPANY_NAME,
  CATEGORY_NAME,
} = require('../../../helpers/variables/constants/products');
const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

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
      return req.data.responseWithError(NOT_FOUND, orderNotFoundMessage);
    }

    req.data.order = order;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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

    if (
      withModifiedCount
        && updatedProducts.modifiedCount !== order.products.length
    ) {
      return req.data.responseWithError(CONFLICT, productsNotUpdatedMessage);
    }

    if (!withModifiedCount && !updatedProducts) {
      return req.data.responseWithError(CONFLICT, productsNotUpdatedMessage);
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        getProductWithIdNotExistMessage(notExistingProducts[0]),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        getProductWithIdNoEnoughQuantityMessage(notEnoughProductsQuantity[0].name),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
        getProductWithIdChangedMessage(changedProducts[0].name),
      );
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
