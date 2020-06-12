const { productCategoriesDB, productsDB } = require('../../../db');
const { responseWithError } = require('../../../helpers/errors');
const { productCategorySchema } = require('./index.model');
const { addCategory } = require('../../../helpers/product-categories');
const { dbIdSchema } = require('../../../models');

const addProductCategory = async (req, res, next) => {
  if (req.body.category) {
    return responseWithError(res, next, 400, 'Właściwość "category" jest niedozwolona.');
  }

  if (req.body.name && typeof req.body.name === 'string') {
    req.body.category = addCategory(req.body.name);
  }

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
      return responseWithError(res, next, 500, 'Kategoria znajduje się już w bazie danych.');
    }

    let newCategory = null;

    if (category && category.deleted_at) {
      newCategory = await productCategoriesDB.findOneAndUpdate(
        { name: data.name },
        {
          $set: {
            count: 0,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        },
      );
    } else {
      newCategory = await productCategoriesDB.insert({
        ...data,
        count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (!newCategory) {
      return responseWithError(res, next, 500, 'Nie udało się zapisać kategorii w bazie danych.');
    }

    res.status(200).json({ ...newCategory });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getProductCategories = async (req, res, next) => {
  try {
    const total = await productCategoriesDB.count({ deleted_at: null });

    if (!total) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać liczby kategorii.');
    }

    const categories = await productCategoriesDB.find(
      { deleted_at: null },
      { sort: { created_at: -1 } },
    );

    if (!categories) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać kategorii produktów.');
    }

    res.status(200).json(categories);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteProductCategories = async (req, res, next) => {
  try {
    const categories = await productCategoriesDB.find(
      {
        $and: [
          { deleted_at: null },
          { category: { $not: /^(bestsellery|nowosci)$/ } },
        ],
      },
    );

    if (!categories.length) {
      return responseWithError(res, next, 500, 'W bazie danych nie ma żadnych kategorii.');
    }

    const deletedCategories = await productCategoriesDB.update(
      {
        $and: [
          { deleted_at: null },
          { category: { $not: /^(bestsellery|nowosci)$/ } },
        ],
      },
      { $set: { deleted_at: new Date(), count: 0 } },
      { multi: true },
    );

    if (!deletedCategories) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć kategorii.');
    }

    const deletedProducts = await productsDB.update(
      {},
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć produktów przypisanych do kategorii.');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie kategorie.',
      items: deletedCategories.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteProductCategory = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const category = await productCategoriesDB.findOne({ _id: params.id });

    if (!category || (category && category.deleted_at)) {
      return responseWithError(res, next, 500, 'Kategoria nie istnieje.');
    }

    if (category && (category.category === 'bestsellery' || category.category === 'nowosci')) {
      return responseWithError(res, next, 500, 'Nie możesz usunąć tej kategorii.');
    }

    const deletedCategory = await productCategoriesDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date(), count: 0 } },
    );

    if (!deletedCategory) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć kategorii.');
    }

    const deletedProducts = await productsDB.update(
      { category: deletedCategory.name },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedProducts) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć produktów przypisanych do kategorii.');
    }

    res.status(200).json({ ...deletedCategory });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  addProductCategory,
  getProductCategories,
  deleteProductCategories,
  deleteProductCategory,
};
