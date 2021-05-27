const {
  PROPERTY_REQUIRED,
  TYPE_ARRAY,
} = require('../../../constants/error-messages');
const {
  rolesRequiredMessage, rolesNotAllowedMessage,
} = require('../../../variables/users');

// ROLES
const userRolesRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const userRolesArray = {
  'array.base': TYPE_ARRAY,
};

const userRolesIncludesRequiredUnknowns = {
  'array.includesRequiredUnknowns': rolesRequiredMessage,
};

const userRolesInclueds = {
  'array.includes': rolesNotAllowedMessage,
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
