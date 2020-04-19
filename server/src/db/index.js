const monk = require('monk');
const { DB_URL } = require('../config');

// eslint-disable-next-line no-console
const db = monk(DB_URL, {}, () => console.log('Connected to the database'));

const usersDB = db.get('users');

usersDB.createIndex(
  'username, email, reset_password_token',
  { unique: true },
);

const socialMediaDB = db.get('socialMedia');

const contactDB = db.get('contact');

module.exports = {
  db,
  usersDB,
  socialMediaDB,
  contactDB,
};
