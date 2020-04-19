const { contact } = require('../data');
const { contactSchema } = require('../../api/v1/contact/index.model');
const { contactDB } = require('../../db');

const seedContact = async () => {
  const { schemaError, data } = contactSchema(contact, false);

  if (schemaError) {
    // eslint-disable-next-line no-console
    return console.error(schemaError);
  }

  try {
    await contactDB.remove({});
    await contactDB.insert(data);

    // eslint-disable-next-line no-console
    console.log('Database seeded with contact data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = seedContact;
