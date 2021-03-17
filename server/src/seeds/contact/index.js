const { contact } = require('../data');
const { dbSeedsConstants } = require('../../helpers/constants');
const { contactSchema } = require('../../api/v1/contact/index.model');
const { contactDB } = require('../../db');

const { CONTACT_SEEDED } = dbSeedsConstants;

const seedContact = async () => {
  const { schemaError, data } = contactSchema(contact);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await contactDB.remove();

    await contactDB.insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    // eslint-disable-next-line no-console
    console.log(CONTACT_SEEDED);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedContact;
