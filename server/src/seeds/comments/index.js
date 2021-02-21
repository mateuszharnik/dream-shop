const { commentsDB } = require('../../db');

const removeComments = async () => {
  try {
    await commentsDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Deleted comments from database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeComments;
