const { PATH } = require('../variables/constants/files');
const { GALLERY, THUMBNAIL } = require('../variables/constants/products');
const {
  productGalleryMaxLength,
  productThumbnailMaxLength,
} = require('../variables/products');

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
    maxCount: productThumbnailMaxLength,
  },
  {
    name: GALLERY,
    maxCount: productGalleryMaxLength,
  },
];

module.exports = {
  productFields,
  getAvatarUrl,
  getThumbnailUrl,
};
