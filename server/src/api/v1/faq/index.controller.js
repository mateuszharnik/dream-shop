const { faqDB } = require('../../../db');
const {
  FAQS_NOT_FOUND,
  FAQ_NOT_CREATED,
  FAQ_NOT_FOUND,
  FAQ_NOT_UPDATED,
  FAQS_NOT_DELETED,
  FAQ_NOT_DELETED,
  FAQS_DELETED,
  FAQ_ALREADY_EXIST,
} = require('../../../helpers/constants/faq');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getFAQs = async (req, res) => {
  try {
    const faqs = await faqDB.find(
      { deleted_at: null },
      { sort: { created_at: -1 } },
    );

    if (!faqs) {
      return req.data.responseWithError(NOT_FOUND, FAQS_NOT_FOUND);
    }

    res.status(OK).json(faqs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    res.status(OK).json(faq);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    const updatedFAQ = await faqDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.faq,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedFAQ) {
      return req.data.responseWithError(CONFLICT, FAQ_NOT_UPDATED);
    }

    res.status(OK).json(updatedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteFAQs = async (req, res) => {
  try {
    const faqs = await faqDB.find({ deleted_at: null });

    if (!faqs.length) {
      return req.data.responseWithError(NOT_FOUND, FAQS_NOT_FOUND);
    }

    const deletedFAQs = await faqDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedFAQs) {
      return req.data.responseWithError(CONFLICT, FAQS_NOT_DELETED);
    }

    res.status(OK).json({
      message: FAQS_DELETED,
      items: deletedFAQs.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    const deletedFAQ = await faqDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedFAQ) {
      return req.data.responseWithError(CONFLICT, FAQ_NOT_DELETED);
    }

    res.status(OK).json(deletedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const addFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({
      title: req.data.faq.title,
      deleted_at: null,
    });

    if (faq) {
      return req.data.responseWithError(CONFLICT, FAQ_ALREADY_EXIST);
    }

    const createdFAQ = await faqDB.insert({
      ...req.data.faq,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!createdFAQ) {
      return req.data.responseWithError(CONFLICT, FAQ_NOT_CREATED);
    }

    res.status(OK).json(createdFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ,
  addFAQ,
  deleteFAQs,
};
