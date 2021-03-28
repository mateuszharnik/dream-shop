const { regulationsDB } = require('../../../db');
const {
  errorsConstants,
  statusCodesConstants,
} = require('../../../helpers/constants');
const {
  REGULATIONS_NOT_FOUND,
  REGULATION_NOT_FOUND,
  REGULATION_NOT_UPDATED,
  REGULATION_NAME_IS_NOT_ALLOWED,
} = require('../../../helpers/constants/regulations');

const { ERROR_OCCURRED } = errorsConstants;
const {
  OK, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR,
} = statusCodesConstants;

const getRegulations = async (req, res) => {
  const { name = '' } = req.query;

  const query = {
    deleted_at: null,
  };

  if (name) {
    query.name = name;
  }

  try {
    const regulations = await regulationsDB.find(query);

    if (!regulations) {
      return req.data.responseWithError(NOT_FOUND, REGULATIONS_NOT_FOUND);
    }

    res.status(OK).json(regulations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const getRegulation = async (req, res) => {
  try {
    const regulation = await regulationsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!regulation) {
      return req.data.responseWithError(NOT_FOUND, REGULATION_NOT_FOUND);
    }

    res.status(OK).json(regulation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

const updateRegulation = async (req, res) => {
  if (req.data.regulation.name) {
    return req.data.responseWithError(CONFLICT, REGULATION_NAME_IS_NOT_ALLOWED);
  }

  try {
    const regulation = await regulationsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!regulation) {
      return req.data.responseWithError(NOT_FOUND, REGULATION_NOT_FOUND);
    }

    const updatedRegulation = await regulationsDB.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.data.regulation,
          updated_at: new Date(),
        },
      },
    );

    if (!updatedRegulation) {
      return req.data.responseWithError(CONFLICT, REGULATION_NOT_UPDATED);
    }

    res.status(OK).json(updatedRegulation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, ERROR_OCCURRED);
  }
};

module.exports = {
  updateRegulation,
  getRegulations,
  getRegulation,
};
