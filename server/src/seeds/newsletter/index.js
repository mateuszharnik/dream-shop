const { emailsDB } = require('../../db');
const { dbDeleteConstants } = require('../../helpers/constants');

const { NEWSLETTER_DELETED } = dbDeleteConstants;

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
