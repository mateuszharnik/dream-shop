const { PORT } = require('../../config');

const avatarMaxSize = 1024 * 1024 * 5;

const getAvatarUrl = (file) => {
  const path = file.path.replace(/\\/g, '/');

  return `http://localhost:${PORT}/${path}`;
};

module.exports = {
  getAvatarUrl,
  avatarMaxSize,
};
