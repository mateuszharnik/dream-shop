const joiConfigObject = {
  'object.base': 'Dane muszą być typu "object"',
};

const joiConfigObjectUnknow = {
  'object.unknown': 'Właściwość {#label} jest niedozwolona',
};

const joiConfigRequired = {
  'any.required': 'Dane są wymagane',
};

const joiConfigArray = {
  'array.base': 'Dane muszą być typu "array"',
};

const joiConfigArrayLength = {
  'array.length': 'Kategorii najczęściej zadawanych pytań powinno być {#limit}',
};

const joiConfigArrayIncludesRequiredUnknowns = {
  'array.includesRequiredUnknowns': 'Dane nie posiadają wymaganych elementów',
};

const joiConfigArrayOnly = {
  'any.only': 'Dane mogą zawierać tylko następujące elementy: {#valids}',
};

const joiConfigMessages = {
  ...joiConfigObject,
  ...joiConfigRequired,
  ...joiConfigObjectUnknow,
};

const joiArrayConfigMessages = {
  ...joiConfigArrayIncludesRequiredUnknowns,
  ...joiConfigArrayOnly,
  ...joiConfigArray,
  ...joiConfigArrayLength,
  ...joiConfigRequired,
};

module.exports = {
  joiConfigArray,
  joiConfigArrayOnly,
  joiConfigArrayIncludesRequiredUnknowns,
  joiConfigArrayLength,
  joiConfigObject,
  joiConfigObjectUnknow,
  joiConfigRequired,
  joiConfigMessages,
  joiArrayConfigMessages,
};
