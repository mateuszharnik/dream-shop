const monk = require('monk');
const { DB_URL } = require('../config');
const {
  dbConnected,
  users,
  socialMedia,
  emails,
  contact,
  about,
  comments,
  map,
  faqs,
  faqCategories,
  products,
  productCategories,
  productFilters,
  regulations,
  messages,
  orders,
} = require('../helpers/variables/db');

// eslint-disable-next-line no-console
const db = monk(DB_URL, {}, () => console.log(dbConnected));

const usersDB = db.get(users);
const socialMediaDB = db.get(socialMedia);
const emailsDB = db.get(emails);
const contactDB = db.get(contact);
const aboutDB = db.get(about);
const commentsDB = db.get(comments);
const mapDB = db.get(map);
const faqCategoriesDB = db.get(faqCategories);
const faqDB = db.get(faqs);
const productCategoriesDB = db.get(productCategories);
const productFiltersDB = db.get(productFilters);
const productsDB = db.get(products);
const regulationsDB = db.get(regulations);
const messagesDB = db.get(messages);
const ordersDB = db.get(orders);

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
