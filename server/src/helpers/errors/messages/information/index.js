const informationRequired = {
  'any.required': 'Właściwość "information" jest wymagana',
};

const informationString = {
  'string.base': 'Właściwość "information" musi być typu "string"',
};

const informationMin = {
  'string.min': 'Informacje o sklepie muszą mieć minimum 10 znaków',
};

const informationMax = {
  'string.max': 'Informacje o sklepie mogą mieć maksymalnie 5000 znaków',
};

const informationMessages = {
  ...informationRequired,
  ...informationString,
  ...informationMax,
  ...informationMin,
};

module.exports = {
  informationRequired,
  informationString,
  informationMax,
  informationMin,
  informationMessages,
};
