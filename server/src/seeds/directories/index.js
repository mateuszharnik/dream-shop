const colors = require('colors/safe');
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
} = require('../../helpers/variables/constants/directories');

const createDirectories = () => {
  try {
    if (fs.existsSync(AVATARS_DIR)) {
      fs.rmdirSync(AVATARS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(colors.green(deletedAvatarFolderMessage));
    }

    fs.mkdirSync(AVATARS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(colors.green(createdAvatarFolderMessage));

    if (fs.existsSync(PRODUCTS_DIR)) {
      fs.rmdirSync(PRODUCTS_DIR, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(colors.green(deletedProductsFolderMessage));
    }

    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
    // eslint-disable-next-line no-console
    console.log(colors.green(createdProductsFolderMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = createDirectories;
