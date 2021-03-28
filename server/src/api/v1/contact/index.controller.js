const { contactDB } = require('../../../db');
const {
  CONTACT_NOT_FOUND,
  CONTACT_NOT_UPDATED,
} = require('../../../helpers/constants/contact');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getContact = async (req, res) => {
  try {
    const contact = await contactDB.findOne({ deleted_at: null });

    if (!contact) {
      return req.data.responseWithError(NOT_FOUND, CONTACT_NOT_FOUND);
    }

    res.status(OK).json(contact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await contactDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!contact) {
      return req.data.responseWithError(NOT_FOUND, CONTACT_NOT_FOUND);
    }

    const updatedContact = await contactDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.contact,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedContact) {
      return req.data.responseWithError(CONFLICT, CONTACT_NOT_UPDATED);
    }

    res.status(OK).json(updatedContact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  updateContact,
  getContact,
};
