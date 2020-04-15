const crypto = require('crypto');
const { verifyToken } = require('../token');

const generateRandomBytes = (prefix) => new Promise((resolve, reject) => {
  crypto.randomBytes(10, (error, buf) => {
    if (error) {
      reject(new Error('Nie udało się wygenerować tokenu'));
    } else {
      resolve(`${prefix}${buf.toString('hex')}`);
    }
  });
});

const setUser = async (req, token) => {
  try {
    const user = await verifyToken(token);

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { setUser, generateRandomBytes };
