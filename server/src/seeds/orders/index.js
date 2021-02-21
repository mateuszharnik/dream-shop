const { ordersDB } = require('../../db');

const removeOrders = async () => {
  try {
    await ordersDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Deleted orders from database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeOrders;
