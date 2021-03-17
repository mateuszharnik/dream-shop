const { mapDB } = require('../../../db');
const {
  mapConstants,
  errorsConstants,
  statusCodesConstants,
} = require('../../../helpers/constants');

const { MAP_NOT_FOUND, MAP_NOT_UPDATED } = mapConstants;
const { ERROR_OCCURRED } = errorsConstants;
const {
  OK, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR,
} = statusCodesConstants;

const getMap = async (req, res) => {
  try {
    const map = await mapDB.findOne({ deleted_at: null });

    if (!map) {
      return req.data.responseWithError(NOT_FOUND, MAP_NOT_FOUND);
    }

    res.status(OK).json(map);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateMap = async (req, res) => {
  try {
    const map = await mapDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!map) {
      return req.data.responseWithError(NOT_FOUND, MAP_NOT_FOUND);
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
      return req.data.responseWithError(CONFLICT, MAP_NOT_UPDATED);
    }

    res.status(OK).json(updatedMap);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  updateMap,
  getMap,
};
