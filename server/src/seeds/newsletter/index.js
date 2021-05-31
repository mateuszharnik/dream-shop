const { emailsDB } = require('../../db');
const { newsletterDeletedMessage } = require('../../helpers/variables/tasks');

const removeNewsletterEmails = async () => {
  try {
    await emailsDB.remove();

    // eslint-disable-next-line no-console
    console.log(newsletterDeletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeNewsletterEmails;
