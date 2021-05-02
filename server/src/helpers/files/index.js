const { PATH } = require('../constants/files');
const { GALLERY, THUMBNAIL } = require('../constants/products');
const { ONE, NINE } = require('../constants/numbers');

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

const productFields = [
  {
    name: THUMBNAIL,
    maxCount: ONE,
  },
  {
    name: GALLERY,
    maxCount: NINE,
  },
];

module.exports = {
  productFields,
  getAvatarUrl,
  getThumbnailUrl,
};
