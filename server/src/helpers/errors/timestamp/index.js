const createdAtRequired = {
  prop: 'created_at',
  type: 'any.required',
  message: 'Właściwość created_at jest wymagana',
  status: 400,
};

const createdAtDate = {
  prop: 'created_at',
  type: 'date.base',
  message: 'Właściwość created_at musi być datą',
  status: 400,
};

const updatedAtRequired = {
  prop: 'updated_at',
  type: 'any.required',
  message: 'Właściwość updated_at jest wymagana',
  status: 400,
};


const updatedAtDate = {
  prop: 'updated_at',
  type: 'date.base',
  message: 'Właściwość updated_at musi być datą',
  status: 400,
};

const deletedAtRequired = {
  prop: 'deleted_at',
  type: 'any.required',
  message: 'Właściwość deleted_at jest wymagana',
  status: 400,
};

const deletedAtDate = {
  prop: 'deleted_at',
  type: 'date.base',
  message: 'Właściwość deleted_at musi być datą',
  status: 400,
};

module.exports = {
  createdAtRequired,
  createdAtDate,
  updatedAtRequired,
  updatedAtDate,
  deletedAtRequired,
  deletedAtDate,
};
