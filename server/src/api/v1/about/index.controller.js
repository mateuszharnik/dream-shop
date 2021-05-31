const { aboutDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  aboutNotFoundMessage,
  aboutNotUpdatedMessage,
} = require('../../../helpers/variables/about');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const getAbout = async (req, res) => {
  try {
    const about = await aboutDB.findOne({ deleted_at: null });

    if (!about) {
      return req.data.responseWithError(NOT_FOUND, aboutNotFoundMessage);
    }

    res.status(OK).json(about);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateAbout = async (req, res) => {
  try {
    const about = await aboutDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!about) {
      return req.data.responseWithError(NOT_FOUND, aboutNotFoundMessage);
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
      return req.data.responseWithError(CONFLICT, aboutNotUpdatedMessage);
    }

    res.status(OK).json(updatedAbout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  updateAbout,
  getAbout,
};
