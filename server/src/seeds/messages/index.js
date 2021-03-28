const { messagesDB } = require('../../db');
const { MESSAGES_DELETED } = require('../../helpers/constants/tasks');

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
