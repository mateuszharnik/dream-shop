const { productSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { responseWithError } = require('../../../helpers/errors');
const { productsDB } = require('../../../db');

const getProducts = async (req, res, next) => {
  try {
    const products = await productsDB.find({ deleted_at: null });

    if (!products) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać produktów');
    }

    res.status(200).json(products);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje');
    }

    res.status(200).json({ ...product });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const addProduct = async (req, res, next) => {
  const { schemaError, data } = productSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const product = await productsDB.insert({
      ...data,
      selled: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!product) {
      return responseWithError(res, next, 500, 'Nie udało się dodać produktu');
    }

    res.status(200).json({ ...product });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const deleteProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje');
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedProduct) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć produktu');
    }

    res.status(200).json({ ...updatedProduct });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateProduct = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  const { schemaError, data } = productSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const product = await productsDB.findOne({ _id: params.id });

    if (!product || (product && product.deleted_at)) {
      return responseWithError(res, next, 500, 'Produkt nie istnieje');
    }

    const updatedProduct = await productsDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedProduct) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować produktu');
    }

    res.status(200).json({ ...updatedProduct });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
