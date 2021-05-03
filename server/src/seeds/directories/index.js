const fs = require('fs');
const {
  AVATARS_DIR,
  PRODUCTS_DIR,
  DELETED_AVATAR_FOLDER,
  DELETED_PRODUCTS_FOLDER,
  CREATED_AVATAR_FOLDER,
  CREATED_PRODUCTS_FOLDER,
} = require('../../helpers/constants/directories');

const createDirectories = () => {
  try {
    if (fs.existsSync(AVATARS_DIR)) {
      fs.rmdirSync(AVATARS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(DELETED_AVATAR_FOLDER);
    }

    fs.mkdirSync(AVATARS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(CREATED_AVATAR_FOLDER);

    if (fs.existsSync(PRODUCTS_DIR)) {
      fs.rmdirSync(PRODUCTS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(DELETED_PRODUCTS_FOLDER);
    }

    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(CREATED_PRODUCTS_FOLDER);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = createDirectories;
