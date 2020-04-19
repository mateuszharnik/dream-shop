const userRolesRequired = {
  'any.required': 'Właściwość "roles" jest wymagana',
};

const userRolesString = {
  'array.base': 'Właściwość "roles" musi być typu "array"',
};

const userRolesIncludesRequiredUnknowns = {
  'array.includesRequiredUnknowns': 'Właściwość "roles" nie posiada wymaganych elementów',
};

const userRolesInclueds = {
  'array.includes': 'Właściwość "roles" zawiera elementy będące niedozwolonymi typami',
};

const userRolesMessages = {
  ...userRolesRequired,
  ...userRolesString,
  ...userRolesIncludesRequiredUnknowns,
  ...userRolesInclueds,
};

module.exports = {
  userRolesRequired,
  userRolesString,
  userRolesIncludesRequiredUnknowns,
  userRolesInclueds,
  userRolesMessages,
};
