const { ordersDB } = require('../../db');
const { ORDERS_DELETED } = require('../../helpers/constants/tasks');

const removeOrders = async () => {
  try {
    await ordersDB.remove();

    // eslint-disable-next-line no-console
    console.log(ORDERS_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeOrders;
