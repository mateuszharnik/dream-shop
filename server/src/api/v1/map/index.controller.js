const { mapDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  mapNotFoundMessage,
  mapNotUpdatedMessage,
} = require('../../../helpers/variables/map');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

const getMap = async (req, res) => {
  try {
    const map = await mapDB.findOne({ deleted_at: null });

    if (!map) {
      return req.data.responseWithError(NOT_FOUND, mapNotFoundMessage);
    }

    res.status(OK).json(map);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateMap = async (req, res) => {
  try {
    const map = await mapDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!map) {
      return req.data.responseWithError(NOT_FOUND, mapNotFoundMessage);
    }

    const updatedMap = await mapDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.map,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedMap) {
      return req.data.responseWithError(CONFLICT, mapNotUpdatedMessage);
    }

    res.status(OK).json(updatedMap);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  updateMap,
  getMap,
};
