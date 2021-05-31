const { ordersDB } = require('../../db');
const { ordersDeletedMessage } = require('../../helpers/variables/tasks');

const removeOrders = async () => {
  try {
    await ordersDB.remove();

    // eslint-disable-next-line no-console
    console.log(ordersDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeOrders;
