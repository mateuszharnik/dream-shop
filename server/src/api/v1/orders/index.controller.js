const { ordersDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { DESC } = require('../../../helpers/variables/constants/queries');
const {
  ordersNotFoundMessage,
  orderNotDeletedMessage,
  ordersNotDeletedMessage,
  ordersDeletedMessage,
  orderNotAcceptedMessage,
  orderNotRefusedMessage,
  orderNotPaidMessage,
  orderNotAddedMessage,
} = require('../../../helpers/variables/orders');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const getOrders = async (req, res) => {
  const { sort = DESC } = req.query;
  const { skip, limit } = req.data;

  try {
    const total = await ordersDB.count({ deleted_at: null });
    const orders = await ordersDB.find(
      { deleted_at: null },
      {
        skip,
        limit,
        sort: {
          created_at: sort === DESC ? -1 : 1,
        },
      },
    );

    if (!orders) {
      return req.data.responseWithError(NOT_FOUND, ordersNotFoundMessage);
    }

    res.status(OK).json({
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
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getOrder = async (req, res) => {
  const { order } = req.data;

  try {
    res.status(OK).json(order);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const addOrder = async (req, res) => {
  const { order } = req.data;

  try {
    const updatedOrder = await ordersDB.insert({
      ...order,
      isPaid: false,
      isAccepted: false,
      isRefused: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!updatedOrder) {
      return req.data.responseWithError(CONFLICT, orderNotAddedMessage);
    }

    res.status(OK).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const refuseOrder = async (req, res) => {
  try {
    const updatedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isAccepted: false,
          isRefused: true,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedOrder) {
      return req.data.responseWithError(CONFLICT, orderNotRefusedMessage);
    }

    res.status(OK).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const paidOrder = async (req, res) => {
  try {
    const updatedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isPaid: true,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedOrder) {
      return req.data.responseWithError(CONFLICT, orderNotPaidMessage);
    }

    res.status(OK).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const acceptOrder = async (req, res) => {
  try {
    const updatedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isAccepted: true,
          isRefused: false,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedOrder) {
      return req.data.responseWithError(CONFLICT, orderNotAcceptedMessage);
    }

    res.status(OK).json(updatedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteOrders = async (req, res) => {
  try {
    const orders = await ordersDB.find({ deleted_at: null });

    if (!orders.length) {
      return req.data.responseWithError(NOT_FOUND, ordersNotFoundMessage);
    }

    const deletedOrders = await ordersDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedOrders) {
      return req.data.responseWithError(CONFLICT, ordersNotDeletedMessage);
    }

    res.status(OK).json({
      message: ordersDeletedMessage,
      items: deletedOrders.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await ordersDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedOrder) {
      return req.data.responseWithError(CONFLICT, orderNotDeletedMessage);
    }

    res.status(OK).json(deletedOrder);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
  paidOrder,
};
