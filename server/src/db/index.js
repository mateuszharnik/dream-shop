const monk = require('monk');
const { DB_URL } = require('../config');

// eslint-disable-next-line no-console
const db = monk(DB_URL, {}, () => console.log('Connected to the database'));

const users = db.get('users');

users.createIndex('username, email', { unique: true });

module.exports = { db, users };
