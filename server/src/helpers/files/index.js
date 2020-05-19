const { PORT } = require('../../config');

const avatarMaxSize = 1024 * 1024 * 5;
const thumbnailMaxSize = 1024 * 1024 * 5;

const getAvatarUrl = (file) => {
  if (file) {
    const path = file.path.replace(/\\/g, '/');
    return `http://localhost:${PORT}/${path}`;
  }

  return '';
};

const getThumbnailUrl = (file) => {
  if (file) {
    const path = file.path.replace(/\\/g, '/');
    return `http://localhost:${PORT}/${path}`;
  }

  return '';
};

module.exports = {
  getAvatarUrl,
  getThumbnailUrl,
  avatarMaxSize,
  thumbnailMaxSize,
};
