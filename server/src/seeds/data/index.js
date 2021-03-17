const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');

const user = {
  name: '',
  username: 'administrator',
  email: ADMIN_EMAIL,
  avatar: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: ['user', 'administrator'],
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

const regulations = [
  {
    name: 'newsletter',
    content: 'Regulamin Newslettera.',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'kontakt',
    content: 'Regulamin Formularza.',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

const about = {
  information: '',
};

const productCategories = [
  {
    name: 'Bestsellery',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Nowości',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

const faqCategories = [
  {
    category: 'zwroty',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'dostawa',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'płatności',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'obsługa',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'produkty',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'rabaty',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    category: 'inne',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

const contact = {
  email: '',
  phone: '',
  nip: '',
  street: '',
  street_number: '',
  city: '',
  zip_code: '',
  working_hours: '',
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
};

module.exports = {
  user,
  socialMedia,
  contact,
  map,
  about,
  productCategories,
  regulations,
  faqCategories,
};
