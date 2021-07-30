const colors = require('colors/safe');
const orderSchema = require('../../api/v1/orders/index.model');
const { ordersDB, productsDB } = require('../../db');
const { exampleContact, seedOrdersLimit: limit } = require('../../helpers/variables/orders');
const { exampleQuantity } = require('../../helpers/variables/products');
const {
  ordersDeletedMessage,
  ordersSeededMessage,
} = require('../../helpers/variables/tasks');

const removeOrders = async () => {
  try {
    await ordersDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(ordersDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleOrders = async () => {
  const orders = [];
  const updatedProducts = [];

  try {
    const products = await productsDB.find({}, { limit });

    products.forEach((product, index) => {
      const {
        _id, name, company_name, price, thumbnail, category_name, quantity,
      } = product;

      const order = {
        products: [
          {
            _id: _id.toString(),
            name,
            company_name,
            price,
            thumbnail,
            category_name,
            quantity:
              index < Math.floor(limit / 2)
                ? quantity
                : quantity - exampleQuantity,
          },
        ],
        contact: exampleContact,
        isPaid: !!(index % 2),
      };

      const { schemaError, data } = orderSchema(order);

      if (schemaError) {
        // eslint-disable-next-line no-console
        console.error(colors.red(schemaError.details[0].message));
        process.exit(0);
      }

      orders.push({
        ...data,
        isAccepted: false,
        isRefused: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });

      updatedProducts.push({
        updateOne: {
          filter: { _id },
          update: {
            $set: {
              quantity:
                index < Math.floor(limit / 2) ? 0 : quantity - (quantity - exampleQuantity),
              selled: index < Math.floor(limit / 2) ? quantity : quantity - exampleQuantity,
              updated_at: new Date(),
            },
          },
        },
      });
    });

    await ordersDB.remove();
    await ordersDB.insert(orders);
    await productsDB.bulkWrite(updatedProducts);

    // eslint-disable-next-line no-console
    console.log(colors.green(ordersSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeOrders,
  seedExampleOrders,
};
