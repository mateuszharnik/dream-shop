const { capitalize } = require('../../strings');
const {
  BESTSELLERS_PL,
  NEWS_PL,
} = require('../constants/products');

const productCategoriesDeletedMessage = 'Usunięto wszystkie kategorie.';
const productCategoriesNotFoundMessage = 'Nie znaleziono żadnych kategorii.';
const productCategoriesNotDeletedMessage = 'Nie udało się usunąć kategorii.';
const productCategoryNotExistMessage = 'Kategoria nie istnieje.';
const productCategoryAlreadyExistMessage = 'Kategoria już istnieje.';
const productCategoryNotAddedMessage = 'Nie udało się zapisać kategorii.';
const productCategoryNotUpdatedMessage = 'Nie udało się zaktualizować liczby produktów w kategorii.';

const productWithCategoryNotDeletedMessage = 'Nie udało się usunąć produktów przypisanych do kategorii.';

const productCategoriesNotDeletedInFiltersMessage = 'Nie udało się usunąć kategorii w filtrach.';
const productCategoriesNotAddedInFiltersMessage = 'Nie udało się zapisać kategorii w filtrach.';

const categoryCannotBeDeletedMessage = 'Nie możesz usunąć tej kategorii.';

const categoryIsForbiddenMessage = 'Właściwość "category" jest niedozwolona.';

const productCategories = [
  {
    name: capitalize(BESTSELLERS_PL),
  },
  {
    name: capitalize(NEWS_PL),
  },
];

const exampleProductCategories = [
  {
    name: capitalize(BESTSELLERS_PL),
  },
  {
    name: capitalize(NEWS_PL),
  },
  {
    name: capitalize('kremy do rąk'),
  },
  {
    name: capitalize('szampony do włosów'),
  },
  {
    name: capitalize('kremy do twarzy'),
  },
  {
    name: capitalize('kremy do stóp'),
  },
  {
    name: capitalize('perfumy'),
  },
];

module.exports = {
  productCategories,
  exampleProductCategories,
  productCategoriesDeletedMessage,
  productCategoriesNotFoundMessage,
  productCategoriesNotDeletedMessage,
  productCategoryNotExistMessage,
  productCategoryAlreadyExistMessage,
  productCategoryNotAddedMessage,
  productCategoryNotUpdatedMessage,
  productWithCategoryNotDeletedMessage,
  productCategoriesNotDeletedInFiltersMessage,
  productCategoriesNotAddedInFiltersMessage,
  categoryCannotBeDeletedMessage,
  categoryIsForbiddenMessage,
};
