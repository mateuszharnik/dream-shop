const bcrypt = require('bcryptjs');
const { users } = require('../../db');
const { userSchema } = require('../../api/v1/users/index.model');
const { user } = require('../data');

const seedUser = async () => {
  const { error: schemaError, value: data } = userSchema.validate(user);

  // eslint-disable-next-line no-console
  if (schemaError) return console.error(schemaError);

  try {
    data.password = await bcrypt.hash(data.password, 12);

    await users.remove({});
    await users.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with users data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedUser;
