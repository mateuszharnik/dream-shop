const {
  PROPERTY_REQUIRED,
  TYPE_ARRAY,
} = require('../../../constants/error-messages');
const {
  ROLES_REQUIRED, ROLES_NOT_ALLOWED,
} = require('../../../constants/users');

const userRolesRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const userRolesArray = {
  'array.base': TYPE_ARRAY,
};

const userRolesIncludesRequiredUnknowns = {
  'array.includesRequiredUnknowns': ROLES_REQUIRED,
};

const userRolesInclueds = {
  'array.includes': ROLES_NOT_ALLOWED,
};

const userRolesMessages = {
  ...userRolesRequired,
  ...userRolesArray,
  ...userRolesIncludesRequiredUnknowns,
  ...userRolesInclueds,
};

module.exports = {
  userRolesRequired,
  userRolesArray,
  userRolesIncludesRequiredUnknowns,
  userRolesInclueds,
  userRolesMessages,
};
