const { faqCategoriesDB } = require('../../../db');
const { FAQ_CATEGORIES_NOT_FOUND } = require('../../../helpers/constants/faq');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
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
      return req.data.responseWithError(NOT_FOUND, FAQ_CATEGORIES_NOT_FOUND);
    }

    res.status(OK).json(faqCategories);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  getFAQCategories,
};
