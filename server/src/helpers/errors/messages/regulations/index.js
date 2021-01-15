// NAME
const nameRequired = {
  'any.required': 'Właściwość "name" jest wymagana.',
};

const nameString = {
  'string.base': 'Właściwość "name" musi być typu "string".',
};

const nameMin = {
  'string.min': 'Nazwa regulaminu musi mieć minimum 3 znaki.',
};

const nameMax = {
  'string.max': 'Nazwa regulaminu może mieć maksymalnie 256 znaków.',
};

// CONTENT
const contentRequired = {
  'any.required': 'Właściwość "content" jest wymagana.',
};

const contentString = {
  'string.base': 'Właściwość "content" musi być typu "string".',
};

const contentMin = {
  'string.min': 'Regulamin musi mieć minimum 3 znaki.',
};

const contentMax = {
  'string.max': 'Regulamin może mieć maksymalnie 20000 znaków.',
};

const nameMessages = {
  ...nameRequired,
  ...nameString,
  ...nameMax,
  ...nameMin,
};

const contentMessages = {
  ...contentRequired,
  ...contentString,
  ...contentMax,
  ...contentMin,
};

module.exports = {
  nameRequired,
  nameString,
  nameMax,
  nameMin,
  nameMessages,
  contentRequired,
  contentString,
  contentMax,
  contentMin,
  contentMessages,
};
