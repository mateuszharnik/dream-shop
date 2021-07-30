const colors = require('colors/safe');
const contactSchema = require('../../api/v1/contact/index.model');
const { contactSeededMessage } = require('../../helpers/variables/tasks');
const { contactDB } = require('../../db');
const { exampleContact, contact } = require('../../helpers/variables/contact');

const seedContact = async () => {
  const { schemaError, data } = contactSchema(contact);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(contactSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleContact = async () => {
  const { schemaError, data } = contactSchema(exampleContact);

  if (schemaError) {
    // eslint-disable-next-line no-console
    console.error(colors.red(schemaError.details[0].message));
    process.exit(0);
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
    console.log(colors.green(contactSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  seedContact,
  seedExampleContact,
};
