const colors = require('colors/safe');
const fs = require('fs');
const sharp = require('sharp');
const { PRODUCTS_DIR } = require('../variables/constants/directories');
const { JPEG } = require('../variables/constants/types');
const { PATH } = require('../variables/constants/files');
const {
  productImageNewWidth,
  productImageNewHeight,
} = require('../variables/files');
const {
  companyNames,
  categoryName,
  exampleThumbnailName,
  exampleThumbnailNotExistMessage,
  exampleQuantity,
  exampleProductsLangth,
  exampleDescription,
} = require('../variables/products');

const createThumbnail = (image, name) => new Promise((resolve, reject) => {
  sharp(image)
    .toFormat(JPEG)
    .resize(productImageNewWidth, productImageNewHeight)
    .toFile(`./${PRODUCTS_DIR}/${name}`)
    .then(() => {
      resolve(`${PATH}/${PRODUCTS_DIR}/${name}`);
    })
    .catch((error) => {
      reject(error);
    });
});

const createProducts = async () => {
  const products = [];

  let image = null;

  if (fs.existsSync(exampleThumbnailName)) {
    image = fs.readFileSync(exampleThumbnailName);

    if (!image) {
      // eslint-disable-next-line no-console
      console.log(colors.red(exampleThumbnailNotExistMessage));
      process.exit(0);
    }
  }

  const fileNames = [];

  for (let i = 0; i < exampleProductsLangth; i += 1) {
    fileNames.push(`${new Date().getTime() + i * 2}.jpeg`);
  }

  const thumbnails = await Promise.all(
    fileNames.map((name) => createThumbnail(image, name)),
  );

  for (let i = 0; i < exampleProductsLangth; i += 1) {
    products.push({
      name: `Produkt numer ${i + 1}`,
      company_name: companyNames[i % companyNames.length],
      description: exampleDescription,
      quantity: i + exampleQuantity,
      price: `${(i + 1) * 10},00 zł`,
      category_name: categoryName[i % categoryName.length],
      thumbnail: thumbnails[i],
      gallery: [],
    });
  }

  return products;
};

module.exports = {
  createProducts,
};
