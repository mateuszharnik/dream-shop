const bcrypt = require('bcryptjs');
const { usersDB } = require('../../db');
const { userSchema } = require('../../api/v1/users/index.model');
const { user } = require('../data');
const { dbSeedsConstants } = require('../../helpers/constants');

const { USER_SEEDED } = dbSeedsConstants;

const seedUsers = async () => {
  const { schemaError, data } = userSchema(user);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
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
    console.log(USER_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedUsers;
