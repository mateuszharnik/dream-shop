const user = {
  name: '',
  username: 'administrator',
  email: '',
  img: '',
  password: 'password',
  roles: ['user', 'administrator'],
  resetPasswordToken: null,
  resetPasswordTokenExp: null,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

module.exports = { user };
