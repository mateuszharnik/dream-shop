const crypto = require('crypto');
const { verifyToken } = require('../token');
const { TOKEN_NOT_GENERATED } = require('../constants/auth');
const { HEX } = require('../constants/types');

const generateRandomBytes = (prefix) => new Promise((resolve, reject) => {
  crypto.randomBytes(10, (error, buf) => {
    if (error) {
      reject(new Error(TOKEN_NOT_GENERATED));
    } else {
      resolve(`${prefix}${buf.toString(HEX)}`);
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
