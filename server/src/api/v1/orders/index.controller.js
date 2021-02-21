const { dbIdSchema } = require('../../../models');
const { orderSchema } = require('./index.model');
const { responseWithError } = require('../../../helpers/errors');
const { productsDB, ordersDB } = require('../../../db');

const getOrders = async (req, res, next) => {
  const { sort = 'desc' } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  try {
    const total = await ordersDB.count({ deleted_at: null });
    const orders = await ordersDB.find(
      { deleted_at: null },
      {
        skip: Number(skip),
        limit: Number(limit),
        sort: {
          created_at: sort === 'desc' ? -1 : 1,
        },
      },
    );

    if (!orders) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się pobrać zamówień.',
      );
    }

    res.status(200).json({
      total,
      orders,
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

const getOrder = async (req, res, next) => {
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
    const order = await ordersDB.findOne({ _id: params.id });

    if (!order || (order && order.deleted_at)) {
      return responseWithError(res, next, 500, 'Zamówienie nie istnieje.');
    }

    res.status(200).json(order);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const addOrder = async (req, res, next) => {
  const { schemaError, data } = orderSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const arrayOfIDs = data.products.map((product) => product._id);

    const products = await productsDB.find({
      _id: { $in: arrayOfIDs },
      deleted_at: null,
    });

    const notExistingProducts = arrayOfIDs.reduce((array, id) => {
      const index = products.findIndex((product) => product._id.toString() === id);

      if (index === -1) {
        array.push(id);
      }

      return array;
    }, []);

    if (notExistingProducts.length) {
      return responseWithError(
        res,
        next,
        500,
        `Produkt o id ${notExistingProducts[0]} nie istnieje.`,
      );
    }

    const notEnoughProductsQuantity = products.reduce((array, product) => {
      const index = data.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      if (product.quantity < data.products[index].quantity) {
        array.push(product);
      }

      return array;
    }, []);

    if (notEnoughProductsQuantity.length) {
      return responseWithError(
        res,
        next,
        500,
        `Produkt ${notEnoughProductsQuantity[0].name} nie ma wystarczającej ilości dostępnych sztuk.`,
      );
    }

    const changedProducts = products.reduce((array, product) => {
      const index = data.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      const propsArr = ['name', 'price', 'thumbnail', 'company_name', 'category_name'];

      propsArr.every((prop) => {
        if (product[prop] !== data.products[index][prop]) {
          array.push(product);
          return false;
        }

        return true;
      });

      return array;
    }, []);

    if (changedProducts.length) {
      return responseWithError(
        res,
        next,
        500,
        `Produkt ${changedProducts[0].name} został zaktualizowany od momentu dodania go do koszyka.`,
      );
    }

    const bulkArr = products.reduce((array, product) => {
      const index = data.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      array.push({
        updateOne: {
          filter: { _id: product._id },
          update: {
            $set: {
              quantity: products[index].quantity - product.quantity,
              updated_at: new Date(),
            },
          },
        },
      });

      return array;
    }, []);

    const updatedProducts = await productsDB.bulkWrite(bulkArr);

    if (updatedProducts.modifiedCount !== data.products.length) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować wszystkich produktów.',
      );
    }

    const order = await ordersDB.insert({
      ...data,
      accepted: false,
      refused: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!order) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się dodać zamówienia.',
      );
    }

    res.status(200).json(order);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const refuseOrder = async (req, res, next) => {
  try {
    const order = await ordersDB.findOne({ _id: req.params.id });

    if (!order) {
      return responseWithError(
        res,
        next,
        500,
        'Zamówienie nie istnieje.',
      );
    }

    const arrayOfIDs = order.products.map((product) => product._id);

    const products = await productsDB.find({
      _id: { $in: arrayOfIDs },
      deleted_at: null,
    });

    const bulkArr = products.reduce((array, product) => {
      const index = order.products.findIndex(
        ({ _id }) => _id.toString() === product._id.toString(),
      );

      array.push({
        updateOne: {
          filter: { _id: product._id },
          update: {
            $set: {
              quantity: products[index].quantity + product.quantity,
              updated_at: new Date(),
            },
          },
        },
      });

      return array;
    }, []);

    const updatedProducts = await productsDB.bulkWrite(bulkArr);

    if (!updatedProducts) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się zaktualizować wszystkich produktów.',
      );
    }

    const updatedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          accepted: false,
          refused: true,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedOrder) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się oznaczyć zamówienia jako anulowane.',
      );
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const order = await ordersDB.findOne({ _id: req.params.id });

    if (!order) {
      return responseWithError(
        res,
        next,
        500,
        'Zamówienie nie istnieje.',
      );
    }

    const updatedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          accepted: true,
          refused: false,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedOrder) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się oznaczyć zamówienia jako wysłane.',
      );
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteOrders = async (req, res, next) => {
  try {
    const orders = await ordersDB.find({ deleted_at: null });

    if (!orders.length) {
      return responseWithError(
        res,
        next,
        500,
        'W bazie danych nie ma żadnych zamówień.',
      );
    }

    const deletedOrders = await ordersDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedOrders) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć zamówień.',
      );
    }

    res.status(200).json({
      message: 'Usunięto wszystkie zamówienia',
      items: deletedOrders.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteOrder = async (req, res, next) => {
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
    const order = await ordersDB.findOne({ _id: params.id });

    if (!order || (order && order.deleted_at)) {
      return responseWithError(
        res,
        next,
        500,
        'Zamówienie nie znajduje się w bazie danych.',
      );
    }

    const deletedOrder = await ordersDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedOrder) {
      return responseWithError(
        res,
        next,
        500,
        'Nie udało się usunąć zamówienia.',
      );
    }

    res.status(200).json(deletedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  acceptOrder,
  refuseOrder,
  deleteOrders,
};
