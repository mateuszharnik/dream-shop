const createdAtRequired = {
  'any.required': 'Właściwość "created_at" jest wymagana',
};

const createdAtDate = {
  'date.base': 'Właściwość "created_at" musi być typu "date"',
};

const updatedAtRequired = {
  'any.required': 'Właściwość "updated_at" jest wymagana',
};

const updatedAtDate = {
  'date.base': 'Właściwość "updated_at" musi być typu "date"',
};

const deletedAtRequired = {
  'any.required': 'Właściwość "deleted_at" jest wymagana',
};

const deletedAtDate = {
  'date.base': 'Właściwość "deleted_at" musi być typu "date"',
};

const createdAtMessages = {
  ...createdAtRequired,
  ...createdAtDate,
};

const updatedAtMessages = {
  ...updatedAtRequired,
  ...updatedAtDate,
};

const deletedAtMessages = {
  ...deletedAtRequired,
  ...deletedAtDate,
};

const timestampsMessages = {
  ...createdAtMessages,
  ...updatedAtMessages,
  ...deletedAtMessages,
};

module.exports = {
  createdAtMessages,
  updatedAtMessages,
  deletedAtMessages,
  timestampsMessages,
};
