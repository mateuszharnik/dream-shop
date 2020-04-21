const { messagesDB } = require('../../db');

const removeMessages = async () => {
  try {
    await messagesDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Deleted messages from database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeMessages;
