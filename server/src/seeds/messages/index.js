const { messagesDB } = require('../../db');
const { dbDeleteConstants } = require('../../helpers/constants');

const { MESSAGES_DELETED } = dbDeleteConstants;

const removeMessages = async () => {
  try {
    await messagesDB.remove();

    // eslint-disable-next-line no-console
    console.log(MESSAGES_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeMessages;
