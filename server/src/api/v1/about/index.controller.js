const { aboutDB } = require('../../../db');
const { ERROR_OCCURRED } = require('../../../helpers/constants/errors');
const {
  ABOUT_NOT_FOUND,
  ABOUT_NOT_UPDATED,
} = require('../../../helpers/constants/about');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/constants/status-codes');

const getAbout = async (req, res) => {
  try {
    const about = await aboutDB.findOne({ deleted_at: null });

    if (!about) {
      return req.data.responseWithError(NOT_FOUND, ABOUT_NOT_FOUND);
    }

    res.status(OK).json(about);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateAbout = async (req, res) => {
  try {
    const about = await aboutDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!about) {
      return req.data.responseWithError(NOT_FOUND, ABOUT_NOT_FOUND);
    }

    const updatedAbout = await aboutDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.about,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedAbout) {
      return req.data.responseWithError(CONFLICT, ABOUT_NOT_UPDATED);
    }

    res.status(OK).json(updatedAbout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  updateAbout,
  getAbout,
};
