const { verifyToken } = require('../token');

const setUser = async (req, token) => {
  try {
    const user = await verifyToken(token);

    if (user) req.user = user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { setUser };
