const Joi = require('joi');
const {
  productNameMinLength,
  productNameMaxLength,
  companyNameMinLength,
  companyNameMaxLength,
  productDescriptionMinLength,
  productDescriptionMaxLength,
  productQuantityMaxLength,
  productQuantityMinLength,
  productGalleryMaxLength,
} = require('../../../helpers/variables/products');
const {
  productNameMessages,
  priceMessages,
  quantityMessages,
  descriptionMessages,
  categoryMessages,
  thumbnailMessages,
  galleryMessages,
  categoryNameMessages,
  productCompanyNameMessages,
} = require('../../../helpers/errors/messages/product');
const {
  thumbnailRegExp,
  productPriceRegExp,
  productNameRegExp,
  productCategoryRegExp,
} = require('../../../helpers/regexp');
const {
  BESTSELLERS_PL,
  NEWS_PL,
} = require('../../../helpers/constants/products');

const productSchema = (product) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(productNameMinLength)
      .max(productNameMaxLength)
      .regex(productNameRegExp)
      .required()
      .messages(productNameMessages),
    company_name: Joi.string()
      .trim()
      .min(companyNameMinLength)
      .max(companyNameMaxLength)
      .required()
      .messages(productCompanyNameMessages),
    description: Joi.string()
      .trim()
      .min(productDescriptionMinLength)
      .max(productDescriptionMaxLength)
      .required()
      .messages(descriptionMessages),
    quantity: Joi.number()
      .min(productQuantityMinLength)
      .max(productQuantityMaxLength)
      .required()
      .messages(quantityMessages),
    price: Joi.string()
      .trim()
      .regex(productPriceRegExp)
      .required()
      .messages(priceMessages),
    category_name: Joi.string()
      .trim()
      .invalid(BESTSELLERS_PL, NEWS_PL)
      .required()
      .messages(categoryNameMessages),
    category: Joi.string()
      .trim()
      .lowercase()
      .regex(productCategoryRegExp)
      .required()
      .messages(categoryMessages),
    thumbnail: Joi.string()
      .trim()
      .regex(thumbnailRegExp)
      .required()
      .messages(thumbnailMessages),
    gallery: Joi.array()
      .items(Joi.string().trim().regex(thumbnailRegExp))
      .max(productGalleryMaxLength)
      .messages(galleryMessages),
  });

  const { error: schemaError, value: data } = schema.validate(product);

  return { schemaError, data };
};

module.exports = productSchema;
