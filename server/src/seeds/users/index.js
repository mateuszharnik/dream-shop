const bcrypt = require('bcryptjs');
const { usersDB } = require('../../db');
const { userSchema } = require('../../api/v1/users/index.model');
const { user } = require('../data');

const seedUsers = async () => {
  const { schemaError, data } = userSchema(user, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    data.password = await bcrypt.hash(data.password, 12);

    await usersDB.remove({});
    await usersDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with users data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedUsers;
