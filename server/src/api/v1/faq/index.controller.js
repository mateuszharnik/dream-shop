const { responseWithError } = require('../../../helpers/errors');
const { faqSchema } = require('./index.model');
const { dbIdSchema } = require('../../../models');
const { faqDB } = require('../../../db');
const { purify } = require('../../../helpers/sanitize');

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await faqDB.find({ deleted_at: null }, { sort: { created_at: -1 } });

    if (!faqs) {
      return responseWithError(res, next, 500, 'Nie udało się pobrać najczęściej zadawanych pytań.');
    }

    res.status(200).json(faqs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getFAQ = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 404, paramsSchemaError.details[0].message);
  }

  try {
    const faq = await faqDB.findOne({ _id: params.id });

    if (!faq || (faq && faq.deleted_at)) {
      return responseWithError(res, next, 404, 'Pytanie nie istnieje.');
    }

    res.status(200).json({ ...faq });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateFAQ = async (req, res, next) => {
  const { schemaError: paramsSchemaError, data: params } = dbIdSchema(req.params);

  if (paramsSchemaError) {
    return responseWithError(res, next, 400, paramsSchemaError.details[0].message);
  }

  if (req.body) {
    if (req.body.title && typeof req.body.title === 'string') {
      req.body.title = req.body.title.trim();
      const lastChar = req.body.title.charAt(req.body.title.length - 1);
      req.body.title = lastChar === '?' ? req.body.title : `${req.body.title}?`;
    }
  }

  const { schemaError, data } = faqSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const faq = await faqDB.findOne({ _id: params.id });

    if (!faq || (faq && faq.deleted_at)) {
      return responseWithError(res, next, 500, 'Pytanie nie istnieje.');
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
      return responseWithError(res, next, 500, 'Nie udało się zaktualizować pytania.');
    }

    res.status(200).json({ ...updatedFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteFAQs = async (req, res, next) => {
  try {
    const faqs = await faqDB.find({ deleted_at: null });

    if (!faqs.length) {
      return responseWithError(res, next, 500, 'W bazie danych nie ma żadnych pytań.');
    }

    const deletedFAQs = await faqDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedFAQs) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć pytań.');
    }

    res.status(200).json({
      message: 'Usunięto wszystkie pytania.',
      items: deletedFAQs.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
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
      return responseWithError(res, next, 500, 'Pytanie nie istnieje.');
    }

    const deletedFAQ = await faqDB.findOneAndUpdate(
      { _id: params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedFAQ) {
      return responseWithError(res, next, 500, 'Nie udało się usunąć pytania.');
    }

    res.status(200).json({ ...deletedFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const addFAQ = async (req, res, next) => {
  if (req.body) {
    if (req.body.title && typeof req.body.title === 'string') {
      req.body.title = req.body.title.trim();
      const lastChar = req.body.title.charAt(req.body.title.length - 1);
      req.body.title = lastChar === '?' ? req.body.title : `${req.body.title}?`;
    }
  }

  const { schemaError, data } = faqSchema(req.body, false, false);

  if (schemaError) {
    return responseWithError(res, next, 400, schemaError.details[0].message);
  }

  data.purify_content = purify(data.content);

  try {
    const faq = await faqDB.findOne({ title: data.title });

    if (faq && faq.deleted_at === null) {
      return responseWithError(res, next, 500, 'Pytanie znajduje się już w bazie danych.');
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
      return responseWithError(res, next, 500, 'Nie udało się zapisać pytania w bazie danych.');
    }

    res.status(200).json({ ...newFAQ });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getFAQs, getFAQ, updateFAQ, deleteFAQ, addFAQ, deleteFAQs,
};
