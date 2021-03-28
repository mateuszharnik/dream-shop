const { emailsDB } = require('../../db');
const { NEWSLETTER_DELETED } = require('../../helpers/constants/tasks');

const removeNewsletterEmails = async () => {
  try {
    await emailsDB.remove();

    // eslint-disable-next-line no-console
    console.log(NEWSLETTER_DELETED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeNewsletterEmails;
