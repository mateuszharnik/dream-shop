const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');

const user = {
  name: '',
  username: 'administrator',
  email: ADMIN_EMAIL,
  img: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: ['user', 'administrator'],
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

module.exports = { user };
