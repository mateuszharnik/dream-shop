const joiConfigObject = {
  'object.base': 'Dane muszą być typu "object"',
};

const joiConfigObjectUnknow = {
  'object.unknown': 'Właściwość {#label} jest niedozwolona',
};

const joiConfigRequired = {
  'any.required': 'Dane są wymagane',
};

const joiConfigMessages = {
  ...joiConfigObject,
  ...joiConfigRequired,
  ...joiConfigObjectUnknow,
};

module.exports = {
  joiConfigObject,
  joiConfigObjectUnknow,
  joiConfigRequired,
  joiConfigMessages,
};
