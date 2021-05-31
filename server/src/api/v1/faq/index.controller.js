const { faqDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  faqsNotFoundMessage,
  faqNotCreatedMessage,
  faqNotFoundMessage,
  faqNotUpdatedMessage,
  faqsNotDeletedMessage,
  faqNotDeletedMessage,
  faqsDeletedMessage,
  faqAlreadyExistMessage,
} = require('../../../helpers/variables/faq');
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
      return req.data.responseWithError(NOT_FOUND, faqsNotFoundMessage);
    }

    res.status(OK).json(faqs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, faqNotFoundMessage);
    }

    res.status(OK).json(faq);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, faqNotFoundMessage);
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
      return req.data.responseWithError(CONFLICT, faqNotUpdatedMessage);
    }

    res.status(OK).json(updatedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteFAQs = async (req, res) => {
  try {
    const faqs = await faqDB.find({ deleted_at: null });

    if (!faqs.length) {
      return req.data.responseWithError(NOT_FOUND, faqsNotFoundMessage);
    }

    const deletedFAQs = await faqDB.update(
      { deleted_at: null },
      { $set: { deleted_at: new Date() } },
      { multi: true },
    );

    if (!deletedFAQs) {
      return req.data.responseWithError(CONFLICT, faqsNotDeletedMessage);
    }

    res.status(OK).json({
      message: faqsDeletedMessage,
      items: deletedFAQs.n,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({ _id: req.params.id, deleted_at: null });

    if (!faq) {
      return req.data.responseWithError(NOT_FOUND, faqNotFoundMessage);
    }

    const deletedFAQ = await faqDB.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted_at: new Date() } },
    );

    if (!deletedFAQ) {
      return req.data.responseWithError(CONFLICT, faqNotDeletedMessage);
    }

    res.status(OK).json(deletedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const addFAQ = async (req, res) => {
  try {
    const faq = await faqDB.findOne({
      title: req.data.faq.title,
      deleted_at: null,
    });

    if (faq) {
      return req.data.responseWithError(CONFLICT, faqAlreadyExistMessage);
    }

    const createdFAQ = await faqDB.insert({
      ...req.data.faq,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    if (!createdFAQ) {
      return req.data.responseWithError(CONFLICT, faqNotCreatedMessage);
    }

    res.status(OK).json(createdFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
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
