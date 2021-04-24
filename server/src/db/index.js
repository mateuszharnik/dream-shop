const monk = require('monk');
const { DB_URL } = require('../config');
const {
  DB_CONNECTED,
  USERS,
  SOCIAL_MEDIA,
  EMAILS,
  CONTACT,
  ABOUT,
  COMMENTS,
  MAP,
  FAQS,
  FAQ_CATEGORIES,
  PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_FILTERS,
  REGULATIONS,
  MESSAGES,
  ORDERS,
} = require('../helpers/constants/db');

// eslint-disable-next-line no-console
const db = monk(DB_URL, {}, () => console.log(DB_CONNECTED));

const usersDB = db.get(USERS);
const socialMediaDB = db.get(SOCIAL_MEDIA);
const emailsDB = db.get(EMAILS);
const contactDB = db.get(CONTACT);
const aboutDB = db.get(ABOUT);
const commentsDB = db.get(COMMENTS);
const mapDB = db.get(MAP);
const faqCategoriesDB = db.get(FAQ_CATEGORIES);
const faqDB = db.get(FAQS);
const productCategoriesDB = db.get(PRODUCT_CATEGORIES);
const productFiltersDB = db.get(PRODUCT_FILTERS);
const productsDB = db.get(PRODUCTS);
const regulationsDB = db.get(REGULATIONS);
const messagesDB = db.get(MESSAGES);
const ordersDB = db.get(ORDERS);

emailsDB.createIndex('email, deleted_at');
ordersDB.createIndex('deleted_at');
productsDB.createIndex('deleted_at, category');
regulationsDB.createIndex('name, deleted_at');
productCategoriesDB.createIndex('name, category, deleted_at');
productFiltersDB.createIndex('name, category, deleted_at');
messagesDB.createIndex('deleted_at');
faqCategoriesDB.createIndex('categories, deleted_at');
faqDB.createIndex('title, deleted_at');
usersDB.createIndex('username, email, reset_password_token, deleted_at');

module.exports = {
  db,
  usersDB,
  emailsDB,
  socialMediaDB,
  faqDB,
  contactDB,
  regulationsDB,
  faqCategoriesDB,
  mapDB,
  ordersDB,
  aboutDB,
  messagesDB,
  productCategoriesDB,
  productsDB,
  commentsDB,
  productFiltersDB,
};
