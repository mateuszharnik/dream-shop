const colors = require('colors/safe');
const bcrypt = require('bcryptjs');
const { usersDB } = require('../../db');
const { userSchema } = require('../../api/v1/users/index.model');
const { userSeededMessage } = require('../../helpers/variables/tasks');
const { defaultUsername } = require('../../helpers/variables/users');
const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');
const { ADMIN, USER } = require('../../helpers/variables/constants/users');

const defaultUser = {
  name: '',
  username: defaultUsername,
  email: ADMIN_EMAIL,
  avatar: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: [USER, ADMIN],
};

const seedUsers = async () => {
  const { schemaError, data } = userSchema(defaultUser);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(userSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = seedUsers;
