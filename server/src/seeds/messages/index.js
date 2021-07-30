const colors = require('colors/safe');
const messagesSchema = require('../../api/v1/messages/index.model');
const { messagesDB } = require('../../db');
const { purify } = require('../../helpers/sanitize');
const { defaultMessage } = require('../../helpers/variables/messages');
const {
  messagesDeletedMessage,
  messagesSeededMessage,
} = require('../../helpers/variables/tasks');

const createMessages = () => {
  const messages = [];

  for (let i = 0; i < 20; i += 1) {
    messages.push({
      name: 'Jan',
      email: `email${i + 1}@domain.com`,
      subject: `Temat numer ${i + 1}`,
      message: defaultMessage,
      terms_accepted: true,
    });
  }

  return messages;
};

const removeMessages = async () => {
  try {
    await messagesDB.remove();

    // eslint-disable-next-line no-console
    console.log(colors.green(messagesDeletedMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

const seedExampleMessages = async () => {
  const messages = [];

  createMessages().forEach((message) => {
    const { schemaError, data } = messagesSchema(message);

    if (schemaError) {
      // eslint-disable-next-line no-console
      console.error(colors.red(schemaError.details[0].message));
      process.exit(0);
    }

    data.purify_subject = purify(data.subject);
    data.purify_message = purify(data.message);

    messages.push({
      ...data,
      readed: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  });

  try {
    await messagesDB.remove();
    await messagesDB.insert(messages);

    // eslint-disable-next-line no-console
    console.log(colors.green(messagesSeededMessage));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(colors.red(error));
    process.exit(0);
  }
};

module.exports = {
  removeMessages,
  seedExampleMessages,
};
