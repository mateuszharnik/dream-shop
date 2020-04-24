const { productCategoriesDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');
const { productCategorySchema } = require('./index.model');
const { addCategory } = require('../../../helpers/product-categories');

const addProductCategories = async (req, res, next) => {
  if (req.body.category) {
    return responseWithError(res, next, 400, 'Właściwość "category" jest niedozwolona');
  }

  req.body.category = addCategory(req.body);

  const { schemaError, data } = productCategorySchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const category = await productCategoriesDB.findOne({
      $or: [
        { name: data.name },
        { category: data.category },
      ],
    });

    if (category && category.deleted_at === null) {
      return responseWithError(res, next, 500, 'Kategoria znajduje się już w bazie danych');
    }

    let newCategory = null;

    if (category && category.deleted_at) {
      newCategory = await productCategoriesDB.findOneAndUpdate(
        { name: data.name },
        {
          $set: {
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        },
      );
    } else {
      newCategory = await productCategoriesDB.insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (!newCategory) {
      return responseWithError(res, next, 500, 'Nie udało się zapisać kategorii w bazie danych');
    }

    res.status(200).json({ ...newCategory });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getProductCategories = async (req, res, next) => {
  try {
    const categories = await productCategoriesDB.find({ deleted_at: null });

    if (!categories) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać kategorii produktów');
    }

    res.status(200).json(categories);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getProductCategories,
  addProductCategories,
};
