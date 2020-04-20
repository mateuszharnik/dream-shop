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

const contact = {
  email: '',
  phone: '',
  nip: '',
  address: {
    street: '',
    street_number: '',
    city: '',
    zip_code: '',
  },
  working_hours: '',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

const map = {
  latlng: '(00.00, 00.00)',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

const socialMedia = {
  twitter: '',
  facebook: '',
  linkedin: '',
  instagram: '',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

module.exports = {
  user,
  socialMedia,
  contact,
  map,
};
