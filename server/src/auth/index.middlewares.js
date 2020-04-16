const { setUser } = require('../helpers/auth');

const checkToken = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      await setUser(req, token);
    }
  }

  next();
};

module.exports = { checkToken };
