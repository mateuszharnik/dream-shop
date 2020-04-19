const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');
const { emailRequired, emailString, emailPattern } = require('../../../helpers/errors/messages/email');
const {
  emailRegExp, phoneRegExp, nipRegExp, workingHoursRegExp, streetNumberRegExp, zipCodeRegExp,
} = require('../../../helpers/regexp');
const { nipMessages } = require('../../../helpers/errors/messages/nip');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const { workingHoursMessages } = require('../../../helpers/errors/messages/hours');
const {
  streetMessages, streetNumberMessages, cityMessages, zipCodeMessages, adressMessages,
} = require('../../../helpers/errors/messages/adress');

const emailMessages = {
  ...emailRequired,
  ...emailString,
  ...emailPattern,
};

const contactConfig = (contact, id = true, timestamp = true) => {
  const checkAdressObject = (key) => contact && contact.adress && contact.adress[key];

  const street = Joi.string().trim().min(2).max(100)
    .required()
    .messages(streetMessages);

  const street_number = Joi.string().trim().regex(streetNumberRegExp)
    .required()
    .messages(streetNumberMessages);

  const city = Joi.string().trim().min(2).max(100)
    .required()
    .messages(cityMessages);


  const zip_code = Joi.string().trim().regex(zipCodeRegExp)
    .required()
    .messages(zipCodeMessages);

  let config = {
    email: Joi.string().trim().regex(emailRegExp).allow('')
      .required()
      .messages(emailMessages),
    phone: Joi.string().trim().regex(phoneRegExp).allow('')
      .required()
      .messages(phoneMessages),
    nip: Joi.string().trim().regex(nipRegExp).allow('')
      .required()
      .messages(nipMessages),
    working_hours: Joi.string().trim().regex(workingHoursRegExp).allow('')
      .required()
      .messages(workingHoursMessages),
    adress: Joi.object().keys({
      street: checkAdressObject('street_number') ? street : street.allow(''),
      street_number: checkAdressObject('street') ? street_number : street_number.allow(''),
      city: checkAdressObject('zip_code') ? city : city.allow(''),
      zip_code: checkAdressObject('city') ? zip_code : zip_code.allow(''),
    }).required().messages(adressMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamp) {
    config = addTimestamps(config);
  }

  return config;
};

const contactSchema = (contact, id = true, timestamps = true) => {
  const schema = Joi.object().keys(contactConfig(contact, id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(contact);

  return { schemaError, data };
};

module.exports = {
  contactSchema,
};
