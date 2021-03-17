const { faqCategoriesDB } = require('../../../db');
const {
  faqsCategoriesConstants,
  errorsConstants,
  statusCodesConstants,
} = require('../../../helpers/constants');

const { FAQ_CATEGORIES_NOT_FOUND } = faqsCategoriesConstants;
const { ERROR_OCCURRED } = errorsConstants;
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = statusCodesConstants;

const getFAQCategories = async (req, res) => {
  try {
    const faqCategories = await faqCategoriesDB.find(
      {},
      {
        sort: { category: 1 },
        collation: { locale: 'pl', numericOrdering: true },
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
