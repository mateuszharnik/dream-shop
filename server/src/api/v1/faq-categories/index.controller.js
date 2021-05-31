const { faqCategoriesDB } = require('../../../db');
const { faqCategoriesNotFoundMessage } = require('../../../helpers/variables/faq');
const { errorOccurred } = require('../../../helpers/variables/errors');
const { LOCALE_PL } = require('../../../helpers/constants/queries');
const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getFAQCategories = async (req, res) => {
  try {
    const faqCategories = await faqCategoriesDB.find(
      {},
      {
        sort: { category: 1 },
        collation: { locale: LOCALE_PL, numericOrdering: true },
      },
    );

    if (!faqCategories.length) {
      return req.data.responseWithError(NOT_FOUND, faqCategoriesNotFoundMessage);
    }

    res.status(OK).json(faqCategories);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  getFAQCategories,
};
