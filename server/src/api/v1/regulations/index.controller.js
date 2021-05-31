const { regulationsDB } = require('../../../db');
const { errorOccurred } = require('../../../helpers/variables/errors');
const {
  regulationsNotFoundMessage,
  regulationNotFoundMessage,
  regulationNotUpdatedMessage,
  regulationNameIsNotAllowedMessage,
} = require('../../../helpers/variables/regulations');
const {
  OK,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../../../helpers/variables/constants/status-codes');

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
      return req.data.responseWithError(NOT_FOUND, regulationsNotFoundMessage);
    }

    res.status(OK).json(regulations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const getRegulation = async (req, res) => {
  try {
    const regulation = await regulationsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!regulation) {
      return req.data.responseWithError(NOT_FOUND, regulationNotFoundMessage);
    }

    res.status(OK).json(regulation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

const updateRegulation = async (req, res) => {
  if (req.data.regulation.name) {
    return req.data.responseWithError(
      CONFLICT,
      regulationNameIsNotAllowedMessage,
    );
  }

  try {
    const regulation = await regulationsDB.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!regulation) {
      return req.data.responseWithError(NOT_FOUND, regulationNotFoundMessage);
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
      return req.data.responseWithError(CONFLICT, regulationNotUpdatedMessage);
    }

    res.status(OK).json(updatedRegulation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return req.data.responseWithError(INTERNAL_SERVER_ERROR, errorOccurred);
  }
};

module.exports = {
  updateRegulation,
  getRegulations,
  getRegulation,
};
