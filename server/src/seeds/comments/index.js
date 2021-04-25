const { commentsDB } = require('../../db');
const { COMMENTS_DELETED } = require('../../helpers/constants/tasks');

const removeComments = async () => {
  try {
    await commentsDB.remove();

    // eslint-disable-next-line no-console
    console.log(COMMENTS_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeComments;
