const { responseWithError } = require('../../../helpers/errors');
const { faqCategoriesDB } = require('../../../db');

const getFAQCategories = async (req, res, next) => {
  try {
    const faq = await faqCategoriesDB.find({}, { sort: { category: 1 } });

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
  getFAQCategories,
};
