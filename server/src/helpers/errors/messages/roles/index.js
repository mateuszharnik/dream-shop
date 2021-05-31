const {
  rolesRequiredMessage,
  rolesNotAllowedMessage,
} = require('../../../variables/users');
const {
  propertyRequiredMessage,
  typeArrayMessage,
} = require('../../../variables/error-messages');

// ROLES
const userRolesRequired = {
  'any.required': propertyRequiredMessage,
};

const userRolesArray = {
  'array.base': typeArrayMessage,
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
