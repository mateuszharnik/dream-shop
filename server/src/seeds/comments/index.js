const { commentsDB } = require('../../db');
const { commentsDeletedMessage } = require('../../helpers/variables/tasks');

const removeComments = async () => {
  try {
    await commentsDB.remove();

    // eslint-disable-next-line no-console
    console.log(commentsDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeComments;
