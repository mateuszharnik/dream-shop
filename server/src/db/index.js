const monk = require('monk');
const { DB_URL } = require('../config');

// eslint-disable-next-line no-console
const db = monk(DB_URL, {}, () => console.log('Connected to the database'));

const usersDB = db.get('users');
const socialMediaDB = db.get('socialMedia');
const emailsDB = db.get('emails');
const contactDB = db.get('contact');
const aboutDB = db.get('about');
const mapDB = db.get('map');
const faqCategoriesDB = db.get('faq-categories');
const faqDB = db.get('faq');

emailsDB.createIndex('email, deleted_at');
faqCategoriesDB.createIndex('categories');
faqDB.createIndex('title');
usersDB.createIndex(
  'username, email, reset_password_token',
  { unique: true },
);

module.exports = {
  db,
  usersDB,
  emailsDB,
  socialMediaDB,
  faqDB,
  contactDB,
  faqCategoriesDB,
  mapDB,
  aboutDB,
};
