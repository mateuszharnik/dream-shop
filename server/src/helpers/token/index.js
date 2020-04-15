const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

const signToken = (payload, expiresIn) => new Promise((resolve, reject) => {
  jwt.sign(payload, SECRET, { expiresIn }, (error, token) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
});

module.exports = { signToken, verifyToken };
