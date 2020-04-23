// PATH
const pathRequired = {
  'any.required': 'Właściwość "path" jest wymagana',
};

const pathNotEmpty = {
  'string.empty': 'Ścieżka do pliku nie może być pusta',
};

const pathString = {
  'string.base': 'Właściwość "path" musi być typu "string"',
};

const pathPattern = {
  'string.pattern.base': 'Ścieżka do pliku jest nieprawidłowa',
};

// MIMETYPE
const mimetypePattern = {
  'string.pattern.base': 'Typ pliku jest nieprawidłowy',
};

const mimetypeRequired = {
  'any.required': 'Właściwość "mimetype" jest wymagana',
};

const mimetypeNotEmpty = {
  'string.empty': 'Musisz podać typ pliku',
};

const mimetypeString = {
  'string.base': 'Właściwość "mimetype" musi być typu "string"',
};

// SIZE
const sizeMax = {
  'number.max': 'Plik nie może ważyć więcej niż 5 mb',
};

const sizeRequired = {
  'any.required': 'Właściwość "size" jest wymagana',
};

const sizeNumber = {
  'number.base': 'Właściwość "size" musi być typu "number"',
};

const pathMessages = {
  ...pathRequired,
  ...pathNotEmpty,
  ...pathString,
  ...pathPattern,
};

const mimetypeMessages = {
  ...mimetypeRequired,
  ...mimetypeNotEmpty,
  ...mimetypeString,
  ...mimetypePattern,
};

const sizeMessages = {
  ...sizeRequired,
  ...sizeMax,
  ...sizeNumber,
};

module.exports = {
  pathRequired,
  pathNotEmpty,
  pathString,
  pathPattern,
  pathMessages,
  mimetypeRequired,
  mimetypeNotEmpty,
  mimetypeString,
  mimetypePattern,
  mimetypeMessages,
  sizeRequired,
  sizeMax,
  sizeNumber,
  sizeMessages,
};
