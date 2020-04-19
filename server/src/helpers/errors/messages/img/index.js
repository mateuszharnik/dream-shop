const imgRequired = {
  'any.required': 'Właściwość "img" jest wymagana',
};

const imgString = {
  'string.base': 'Właściwość "img" musi być typu "string"',
};

const imgMessages = {
  ...imgString,
  ...imgRequired,
};

module.exports = {
  imgString,
  imgRequired,
  imgMessages,
};
