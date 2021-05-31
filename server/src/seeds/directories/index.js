const fs = require('fs');
const {
  deletedAvatarFolderMessage,
  deletedProductsFolderMessage,
  createdAvatarFolderMessage,
  createdProductsFolderMessage,
} = require('../../helpers/variables/directories');
const {
  AVATARS_DIR,
  PRODUCTS_DIR,
} = require('../../helpers/constants/directories');

const createDirectories = () => {
  try {
    if (fs.existsSync(AVATARS_DIR)) {
      fs.rmdirSync(AVATARS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(deletedAvatarFolderMessage);
    }

    fs.mkdirSync(AVATARS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(createdAvatarFolderMessage);

    if (fs.existsSync(PRODUCTS_DIR)) {
      fs.rmdirSync(PRODUCTS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(deletedProductsFolderMessage);
    }

    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(createdProductsFolderMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = createDirectories;
