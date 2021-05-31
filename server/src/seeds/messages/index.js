const { messagesDB } = require('../../db');
const { messagesDeletedMessage } = require('../../helpers/variables/tasks');

const removeMessages = async () => {
  try {
    await messagesDB.remove();

    // eslint-disable-next-line no-console
    console.log(messagesDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeMessages;
