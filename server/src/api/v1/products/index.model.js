const Joi = require('joi');
const {
  ONE,
  NINE,
  THREE,
  THREE_HUNDRED,
  ONE_THOUSAND,
} = require('../../../helpers/constants/numbers');
const {
  BESTSELLERS_PL,
  NEWS_PL,
} = require('../../../helpers/constants/products');
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

const productSchema = (product) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(THREE)
      .max(THREE_HUNDRED)
      .regex(productNameRegExp)
      .required()
      .messages(productNameMessages),
    company_name: Joi.string()
      .trim()
      .min(THREE)
      .max(THREE_HUNDRED)
      .required()
      .messages(productCompanyNameMessages),
    description: Joi.string()
      .trim()
      .min(THREE)
      .max(ONE_THOUSAND)
      .required()
      .messages(descriptionMessages),
    quantity: Joi.number()
      .min(ONE)
      .max(ONE_THOUSAND)
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
      .max(NINE)
      .messages(galleryMessages),
  });

  const { error: schemaError, value: data } = schema.validate(product);

  return { schemaError, data };
};

module.exports = productSchema;
