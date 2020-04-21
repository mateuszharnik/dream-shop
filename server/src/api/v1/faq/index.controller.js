const { responseWithError } = require('../../../helpers/errors');
const { dbIdSchema, faqSchema } = require('./index.model');
const { faqCategoriesDB, faqDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await faqDB.find({ deleted_at: null });

    if (!faqs) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać najczęściej zadawanych pytań');
    }

    res.status(200).json(faqs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getFAQ = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const faq = await faqDB.findOne({ _id: params.id });

    if (!faq || (faq && faq.deleted_at)) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać pytania');
    }

    res.status(200).json({ ...faq });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const updateFAQ = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  req.body.title = purify(req.body.title);
  req.body.content = purify(req.body.content);

  const { schemaError, data } = faqSchema(req.body, true, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const faq = await faqDB.findOne({ _id: params.id });

    if (!faq || (faq && faq.deleted_at)) {
      return responseWithError(res, next, 500, 'Podane pytanie nie istnieje');
    }

    const updatedFAQ = await faqDB.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedFAQ) {
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować pytania');
    }

    res.status(200).json({ ...updatedFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const deleteFAQ = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  try {
    const faq = await faqDB.findOne({ _id: params.id });

    if (!faq || (faq && faq.deleted_at)) {
      return responseWithError(res, next, 500, 'Podane pytanie nie istnieje');
    }

    const updatedFAQ = await faqDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!updatedFAQ) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć pytania');
    }

    res.status(200).json({ ...updatedFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const addFAQ = async (req, res, next) => {
  req.body.title = purify(req.body.title);
  req.body.content = purify(req.body.content);

  const { schemaError, data } = faqSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  try {
    const faq = await faqDB.findOne({ title: data.title });

    if (faq && faq.deleted_at === null) {
      return responseWithError(res, next, 500, 'Pytanie znajduje się już w bazie danych');
    }

    let newFAQ = null;

    if (faq && faq.deleted_at) {
      newFAQ = await faqDB.findOneAndUpdate(
        { title: data.title },
        {
          $set: {
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        },
      );
    } else {
      newFAQ = await faqDB.insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (!newFAQ) {
      return responseWithError(res, next, 500, 'Nie udało się zapisać pytania w bazie danych');
    }

    res.status(200).json({ ...newFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

const getFAQCategories = async (req, res, next) => {
  try {
    const faq = await faqCategoriesDB.find({});

    if (!faq.length) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać kategorii najczęściej zadawanych pytań');
    }

    res.status(200).json(faq);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd');
  }
};

module.exports = {
  getFAQCategories, getFAQs, getFAQ, updateFAQ, deleteFAQ, addFAQ,
};
