const fs = require('fs');

const avatarDir = 'uploads/avatars';
const productsDir = 'uploads/products';

const createDirectories = () => {
  try {
    if (fs.existsSync(avatarDir)) {
      fs.rmdirSync(avatarDir, { recursive: true });
      // eslint-disable-next-line no-console
      console.log('Deleted avatars folder.');
    }

    fs.mkdirSync(avatarDir, { recursive: true });
    // eslint-disable-next-line no-console
    console.log('Created avatars folder.');

    if (fs.existsSync(productsDir)) {
      fs.rmdirSync(productsDir, { recursive: true });
      // eslint-disable-next-line no-console
      console.log('Deleted products folder.');
    }

    fs.mkdirSync(productsDir, { recursive: true });
    // eslint-disable-next-line no-console
    console.log('Created products folder.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = createDirectories;
