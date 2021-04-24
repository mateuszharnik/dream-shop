const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
  TYPE_NUMBER,
} = require('../../../constants/error-messages');
const {
  PATH_TO_FILE_NOT_CORRECT,
  PATH_TO_FILE_REQUIRED,
  FILE_TYPE_NOT_CORRECT,
  FILE_TYPE_REQUIRED,
  FILE_SIZE_MAX,
} = require('../../../constants/files');

// PATH
const pathRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const pathNotEmpty = {
  'string.empty': PATH_TO_FILE_REQUIRED,
};

const pathString = {
  'string.base': TYPE_STRING,
};

const pathPattern = {
  'string.pattern.base': PATH_TO_FILE_NOT_CORRECT,
};

// MIMETYPE
const mimetypePattern = {
  'string.pattern.base': FILE_TYPE_NOT_CORRECT,
};

const mimetypeRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const mimetypeNotEmpty = {
  'string.empty': FILE_TYPE_REQUIRED,
};

const mimetypeString = {
  'string.base': TYPE_STRING,
};

// SIZE
const sizeMax = {
  'number.max': FILE_SIZE_MAX,
};

const sizeRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const sizeNumber = {
  'number.base': TYPE_NUMBER,
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
