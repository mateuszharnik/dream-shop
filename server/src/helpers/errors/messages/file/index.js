const {
  pathToFileNotCorrectMessage,
  pathToFileRequiredMessage,
  fileTypeNotCorrectMessage,
  fileTypeRequiredMessage,
  fileSizeMaxMessage,
} = require('../../../variables/files');
const {
  propertyRequiredMessage,
  typeStringMessage,
  typeNumberMessage,
} = require('../../../variables/error-messages');

// PATH
const pathRequired = {
  'any.required': propertyRequiredMessage,
};

const pathNotEmpty = {
  'string.empty': pathToFileRequiredMessage,
};

const pathString = {
  'string.base': typeStringMessage,
};

const pathPattern = {
  'string.pattern.base': pathToFileNotCorrectMessage,
};

// MIMETYPE
const mimetypePattern = {
  'string.pattern.base': fileTypeNotCorrectMessage,
};

const mimetypeRequired = {
  'any.required': propertyRequiredMessage,
};

const mimetypeNotEmpty = {
  'string.empty': fileTypeRequiredMessage,
};

const mimetypeString = {
  'string.base': typeStringMessage,
};

// SIZE
const sizeMax = {
  'number.max': fileSizeMaxMessage,
};

const sizeRequired = {
  'any.required': propertyRequiredMessage,
};

const sizeNumber = {
  'number.base': typeNumberMessage,
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
