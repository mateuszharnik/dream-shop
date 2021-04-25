const contactSchema = require('../../api/v1/contact/index.model');
const { contact } = require('../data');
const { CONTACT_SEEDED } = require('../../helpers/constants/tasks');
const { contactDB } = require('../../db');

const seedContact = async () => {
  const { schemaError, data } = contactSchema(contact);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError.details[0].message);
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
