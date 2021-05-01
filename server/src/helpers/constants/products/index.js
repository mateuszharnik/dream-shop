const PRODUCTS_NOT_UPDATED = 'Nie udało się zaktualizować wszystkich produktów.';

const PRODUCT_NAME_REQUIRED = 'Nazwa produktu jest nieprawidłowa.';
const PRODUCT_NAME_MIN_LENGTH = 'Nazwa produktu musi mieć minimum 3 znaki.';
const PRODUCT_NAME_MAX_LENGTH = 'Nazwa produktu może mieć maksymalnie 300 znaków.';

const COMPANY_NAME_MAX_LENGTH = 'Nazwa firmy może mieć maksymalnie 300 znaków.';
const COMPANY_NAME_MIN_LENGTH = 'Nazwa firmy musi mieć minimum 3 znaki.';

const PRODUCT_DESCRIPTION_MIN_LENGTH = 'Opis produktu musi mieć minimum 3 znaki.';
const PRODUCT_DESCRIPTION_MAX_LENGTH = 'Opis produktu może mieć maksymalnie 10000 znaków.';

const PRODUCT_QUANTITY_MIN_LENGTH = 'Musisz dodać przynajmniej 1 produkt.';
const PRODUCT_QUANTITY_MAX_LENGTH = 'Nie możesz dodać więcej niż 1000 produktów.';

const PRODUCT_PRICE_NOT_CORRECT = 'Cena jest nieprawidłowa.';

const PRODUCT_CATEGORY_NAME_REQUIRED = 'Musisz podać nazwę kategorii.';
const PRODUCT_CATEGORY_NAME_NOT_CORRECT = 'Nazwa kategorii jest nieprawidłowa.';
const PRODUCT_CATEGORY_NAME_MIN_LENGTH = 'Nazwa kategorii musi mieć minimum 3 znaki.';
const PRODUCT_CATEGORY_NAME_MAX_LENGTH = 'Nazwa kategorii może mieć maksymalnie 100 znaków.';

const PRODUCT_CATEGORY_REQUIRED = 'Musisz podać kategorię.';
const PRODUCT_CATEGORY_INVALID = 'Nie możesz utworzyć takiej kategorii.';
const PRODUCT_CATEGORY_PATTERN = 'Kategoria może zawierać tylko znaki alfabetu angielskiego rozdzielone znakiem "-".';
const PRODUCT_CATEGORY_MIN_LENGTH = 'Kategoria musi mieć minimum 3 znaki.';
const PRODUCT_CATEGORY_MAX_LENGTH = 'Kategoria może mieć maksymalnie 100 znaków.';

const PRODUCT_GALLERY_MAX_LENGTH = 'Galeria może mieć maksymalnie 9 obrazów.';

const BESTSELLERS = 'bestsellery';
const NEWS = 'nowości';
const NAME = 'name';
const PRICE = 'price';
const THUMBNAIL = 'thumbnail';
const COMPANY_NAME = 'company_name';
const CATEGORY_NAME = 'category_name';

const PRODUCT_WITH_ID_NOT_EXIST = (id = '') => `Produkt o id ${id} nie istnieje.`;
const PRODUCT_WITH_ID_NO_ENOUGHT_QUANTITY = (name = '') => `Produkt ${name} nie ma wystarczającej ilości dostępnych sztuk.`;
const PRODUCT_WITH_ID_CHANGED = (name = '') => `Produkt ${name} został zaktualizowany od momentu dodania go do koszyka.`;

module.exports = {
  PRODUCTS_NOT_UPDATED,
  PRODUCT_NAME_REQUIRED,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_QUANTITY_MIN_LENGTH,
  PRODUCT_QUANTITY_MAX_LENGTH,
  PRODUCT_PRICE_NOT_CORRECT,
  PRODUCT_CATEGORY_NAME_REQUIRED,
  PRODUCT_CATEGORY_NAME_NOT_CORRECT,
  PRODUCT_CATEGORY_NAME_MIN_LENGTH,
  PRODUCT_CATEGORY_NAME_MAX_LENGTH,
  PRODUCT_CATEGORY_REQUIRED,
  PRODUCT_CATEGORY_INVALID,
  PRODUCT_CATEGORY_PATTERN,
  PRODUCT_CATEGORY_MIN_LENGTH,
  PRODUCT_CATEGORY_MAX_LENGTH,
  PRODUCT_GALLERY_MAX_LENGTH,
  BESTSELLERS,
  NEWS,
  NAME,
  PRICE,
  THUMBNAIL,
  COMPANY_NAME,
  CATEGORY_NAME,
  PRODUCT_WITH_ID_NOT_EXIST,
  PRODUCT_WITH_ID_NO_ENOUGHT_QUANTITY,
  PRODUCT_WITH_ID_CHANGED,
};
