const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  ZIP_CODE_REQUIRED,
  ZIP_CODE_NOT_CORRECT,
} = require('../../../constants/contact');

// ZIP CODE
const zipCodeRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const zipCodeString = {
  'string.base': TYPE_STRING,
};

const zipCodeNotEmpty = {
  'string.empty': ZIP_CODE_REQUIRED,
};

const zipCodePattern = {
  'string.pattern.base': ZIP_CODE_NOT_CORRECT,
};

const zipCodeMessages = {
  ...zipCodeRequired,
  ...zipCodeString,
  ...zipCodeNotEmpty,
  ...zipCodePattern,
};

module.exports = {
  zipCodeRequired,
  zipCodeString,
  zipCodeNotEmpty,
  zipCodePattern,
  zipCodeMessages,
};
