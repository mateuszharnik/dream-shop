// CATEGORIES
const categoryRequired = {
  'any.required': 'Właściwość "category" jest wymagana.',
};

const categoryString = {
  'string.base': 'Właściwość "category" musi być typu "string".',
};

const categoryAllow = {
  'any.only': 'Kategoria jest nieprawidłowa.',
};

// TITLE
const titleRequired = {
  'any.required': 'Właściwość "title" jest wymagana.',
};

const titleString = {
  'string.base': 'Właściwość "title" musi być typu "string".',
};

const titleNotEmpty = {
  'string.empty': 'Musisz podać tytuł.',
};

const titleMin = {
  'string.min': 'Tytuł musi mieć minimum 10 znaków.',
};

const titleMax = {
  'string.max': 'Tytuł może mieć maksymalnie 1000 znaków.',
};

const titlePattern = {
  'string.pattern.base': 'Tytuł jest nieprawidłowy.',
};

// CONTENT
const contentRequired = {
  'any.required': 'Właściwość "content" jest wymagana.',
};

const contentString = {
  'string.base': 'Właściwość "content" musi być typu "string".',
};

const contentNotEmpty = {
  'string.empty': 'Musisz podać treść.',
};

const contentMin = {
  'string.min': 'Treść pytania musi mieć minimum 10 znaków.',
};

const contentMax = {
  'string.max': 'Treść pytania może mieć maksymalnie 5000 znaków.',
};

const titleMessages = {
  ...titleRequired,
  ...titleString,
  ...titleNotEmpty,
  ...titleMin,
  ...titleMax,
  ...titlePattern,
};

const contentMessages = {
  ...contentRequired,
  ...contentString,
  ...contentMin,
  ...contentMax,
  ...contentNotEmpty,
};

const categoryMessages = {
  ...categoryRequired,
  ...categoryString,
  ...categoryAllow,
};

module.exports = {
  categoryRequired,
  categoryString,
  categoryAllow,
  categoryMessages,
  contentRequired,
  contentString,
  contentMin,
  contentMax,
  contentNotEmpty,
  contentMessages,
  titlePattern,
  titleRequired,
  titleString,
  titleNotEmpty,
  titleMin,
  titleMax,
  titleMessages,
};
