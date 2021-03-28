const fs = require('fs');
const {
  AVATARS,
  PRODUCTS,
  DELETED_AVATAR_FOLDER,
  DELETED_PRODUCTS_FOLDER,
  CREATED_AVATAR_FOLDER,
  CREATED_PRODUCTS_FOLDER,
} = require('../../helpers/constants/directories');

const createDirectories = () => {
  try {
    if (fs.existsSync(AVATARS)) {
      fs.rmdirSync(AVATARS, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(DELETED_AVATAR_FOLDER);
    }

    fs.mkdirSync(AVATARS, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(CREATED_AVATAR_FOLDER);

    if (fs.existsSync(PRODUCTS)) {
      fs.rmdirSync(PRODUCTS, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(DELETED_PRODUCTS_FOLDER);
    }

    fs.mkdirSync(PRODUCTS, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(CREATED_PRODUCTS_FOLDER);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = createDirectories;
