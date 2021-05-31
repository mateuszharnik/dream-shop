const bcrypt = require('bcryptjs');
const { usersDB } = require('../../db');
const { userSchema } = require('../../api/v1/users/index.model');
const { user } = require('../data');
const { userSeededMessage } = require('../../helpers/variables/tasks');

const seedUsers = async () => {
  const { schemaError, data } = userSchema(user);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError.details[0].message);
  }

  try {
    data.password = await bcrypt.hash(data.password, 12);

    await usersDB.remove();
    await usersDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(userSeededMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedUsers;
