const colors = require('colors/safe');
const newsletterSchema = require('../../api/v1/newsletter/index.model');
const { emailsDB } = require('../../db');
const { newsletterDeletedMessage, newsletterSeededMessage } = require('../../helpers/variables/tasks');

const createEmails = () => {
  const emails = [];

  for (let i = 0; i < 20; i += 1) {
    emails.push({
      email: `email${i + 1}@domain.com`,
      terms_accepted: true,
    });
  }

  return emails;
};

const removeNewsletterEmails = async () => {
  try {
    await emailsDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(newsletterDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleNewsletterEmails = async () => {
  const emails = [];

  createEmails().forEach((email) => {
    const { schemaError, data } = newsletterSchema(email);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    emails.push({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await emailsDB.remove();
    await emailsDB.insert(emails);

    // eslint-disable-next-line no-console
    console.log(colors.green(newsletterSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeNewsletterEmails,
  seedExampleNewsletterEmails,
};
