const { capitalize } = require('../../strings');

const exampleThumbnailNotExistMessage = 'Przykładowy obraz nie istnieje.';
const productsNotUpdatedMessage = 'Nie udało się zaktualizować wszystkich produktów.';
const productNotUpdatedMessage = 'Nie udało się zaktualizować produktu.';
const productsNotFoundMessage = 'Produkty nie istnieją.';
const productNotFoundMessage = 'Produkt nie istnieje.';
const productNotDeletedMessage = 'Nie udało się usunąć produktu.';
const productsNotDeletedMessage = 'Nie udało się usunąć produktów.';
const productNotAddedMessage = 'Nie udało się dodać produktu.';
const productsDeletedMessage = 'Usunięto wszystkie produkty.';

const productNameRequiredMessage = 'Nazwa produktu jest nieprawidłowa.';
const productNameMinLengthMessage = 'Nazwa produktu musi mieć minimum 3 znaki.';
const productNameMaxLengthMessage = 'Nazwa produktu może mieć maksymalnie 300 znaków.';

const productNameMinLength = 3;
const productNameMaxLength = 300;

const companyNameMaxLengthMessage = 'Nazwa firmy może mieć maksymalnie 300 znaków.';
const companyNameMinLengthMessage = 'Nazwa firmy musi mieć minimum 3 znaki.';

const companyNameMinLength = 3;
const companyNameMaxLength = 300;

const productDescriptionMinLengthMessage = 'Opis produktu musi mieć minimum 3 znaki.';
const productDescriptionMaxLengthMessage = 'Opis produktu może mieć maksymalnie 10000 znaków.';

const productDescriptionMinLength = 3;
const productDescriptionMaxLength = 10000;

const productQuantityMinLengthMessage = 'Nie możesz dodać mniej niż 0 produktów.';
const productQuantityMaxLengthMessage = 'Nie możesz dodać więcej niż 1000 produktów.';

const productQuantityMinLength = 0;
const productQuantityRequiredInOrderLength = 1;
const productQuantityMaxLength = 1000;

const productPriceNotCorrectMessage = 'Cena jest nieprawidłowa.';

const productCategoryNameRequiredMessage = 'Musisz podać nazwę kategorii.';
const productCategoryNameNotCorrectMessage = 'Nazwa kategorii jest nieprawidłowa.';
const productCategoryNameMinLengthMessage = 'Nazwa kategorii musi mieć minimum 3 znaki.';
const productCategoryNameMaxLengthMessage = 'Nazwa kategorii może mieć maksymalnie 100 znaków.';

const productCategoryNameMinLength = 3;
const productCategoryNameMaxLength = 100;

const productCategoryRequiredMessage = 'Musisz podać kategorię.';
const productCategoryInvalidMessage = 'Nie możesz utworzyć takiej kategorii.';
const productCategoryPatternMessage = 'Kategoria może zawierać tylko znaki alfabetu angielskiego rozdzielone znakiem "-".';
const productCategoryMinLengthMessage = 'Kategoria musi mieć minimum 3 znaki.';
const productCategoryMaxLengthMessage = 'Kategoria może mieć maksymalnie 100 znaków.';

const productCategoryMinLength = 3;
const productCategoryMaxLength = 100;

const productGalleryMaxLengthMessage = 'Galeria może mieć maksymalnie 9 obrazów.';

const productGalleryMaxLength = 9;
const productThumbnailMaxLength = 1;

const getProductWithIdNotExistMessage = (id = '') => `Produkt o id ${id} nie istnieje.`;
const getProductWithIdNoEnoughQuantityMessage = (name = '') => `Produkt ${name} nie ma wystarczającej ilości dostępnych sztuk.`;
const getProductWithIdChangedMessage = (name = '') => `Produkt ${name} został zaktualizowany od momentu dodania go do koszyka.`;

const companyNames = ['Firma 1', 'Firma 2', 'Firma 3'];

const categoryName = [
  capitalize('kremy do rąk'),
  capitalize('szampony do włosów'),
  capitalize('kremy do twarzy'),
  capitalize('kremy do stóp'),
  capitalize('perfumy'),
];

const exampleThumbnailName = 'src/assets/img/example-thumbnail.jpg';
const exampleQuantity = 4;
const exampleProductsLangth = 300;
const exampleDescription = `
  <h2>To jest opis produktu</h2>
  <img src='http://unsplash.it/800/400?random&gravity=center' alt='Image'/>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptas similique reprehenderit veniam non id facere qui? Molestias accusantium labore sit, blanditiis numquam pariatur adipisci aperiam vitae quaerat! Aperiam, fuga.</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laboriosam officia eos eveniet asperiores ipsam ut maxime pariatur recusandae, ullam error commodi repudiandae minus voluptates voluptate illum laborum temporibus suscipit!</p>
`;

module.exports = {
  exampleDescription,
  exampleQuantity,
  exampleProductsLangth,
  companyNames,
  categoryName,
  exampleThumbnailName,
  productsNotUpdatedMessage,
  productNotUpdatedMessage,
  productsNotFoundMessage,
  productNotFoundMessage,
  productNotDeletedMessage,
  productsNotDeletedMessage,
  productNotAddedMessage,
  productsDeletedMessage,
  productNameRequiredMessage,
  productNameMinLengthMessage,
  productNameMaxLengthMessage,
  productNameMinLength,
  productNameMaxLength,
  companyNameMaxLengthMessage,
  companyNameMinLengthMessage,
  companyNameMinLength,
  companyNameMaxLength,
  productDescriptionMinLengthMessage,
  productDescriptionMaxLengthMessage,
  productDescriptionMinLength,
  productDescriptionMaxLength,
  productQuantityMinLengthMessage,
  productQuantityMaxLengthMessage,
  productQuantityMinLength,
  productQuantityMaxLength,
  productQuantityRequiredInOrderLength,
  productPriceNotCorrectMessage,
  productCategoryNameRequiredMessage,
  productCategoryNameNotCorrectMessage,
  productCategoryNameMinLengthMessage,
  productCategoryNameMaxLengthMessage,
  productCategoryNameMinLength,
  productCategoryNameMaxLength,
  productCategoryRequiredMessage,
  productCategoryInvalidMessage,
  productCategoryPatternMessage,
  productCategoryMinLengthMessage,
  productCategoryMaxLengthMessage,
  productCategoryMinLength,
  productCategoryMaxLength,
  productGalleryMaxLengthMessage,
  productGalleryMaxLength,
  productThumbnailMaxLength,
  exampleThumbnailNotExistMessage,
  getProductWithIdNotExistMessage,
  getProductWithIdNoEnoughQuantityMessage,
  getProductWithIdChangedMessage,
};
