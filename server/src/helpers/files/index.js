const { PATH } = require('../constants/files');

const getAvatarUrl = (file) => {
  if (file) {
    const path = file.path.replace(/\\/g, '/');
    return `${PATH}/${path}`;
  }

  return '';
};

const getThumbnailUrl = (file) => {
  if (file) {
    const path = file.path.replace(/\\/g, '/');
    return `${PATH}/${path}`;
  }

  return '';
};

module.exports = {
  getAvatarUrl,
  getThumbnailUrl,
};
