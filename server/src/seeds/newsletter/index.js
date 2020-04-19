const { emailsDB } = require('../../db');

const removeNewsletterEmails = async () => {
  try {
    await emailsDB.remove({});

    // eslint-disable-next-line no-console
    console.log('Deleted newsletter emails from database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = removeNewsletterEmails;
