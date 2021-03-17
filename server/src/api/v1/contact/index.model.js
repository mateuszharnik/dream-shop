const Joi = require('@hapi/joi');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const {
  emailRequired,
  emailString,
  emailPattern,
} = require('../../../helpers/errors/messages/email');
const {
  emailRegExp,
  phoneRegExp,
  nipRegExp,
  workingHoursRegExp,
  streetNumberRegExp,
  zipCodeRegExp,
} = require('../../../helpers/regexp');
const { nipMessages } = require('../../../helpers/errors/messages/nip');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const {
  workingHoursMessages,
} = require('../../../helpers/errors/messages/hours');
const {
  streetMessages,
  streetNumberMessages,
  cityMessages,
  zipCodeMessages,
} = require('../../../helpers/errors/messages/address');

const emailMessages = {
  ...emailRequired,
  ...emailString,
  ...emailPattern,
};

const street = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages(streetMessages);

const street_number = Joi.string()
  .trim()
  .regex(streetNumberRegExp)
  .required()
  .messages(streetNumberMessages);

const city = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages(cityMessages);

const zip_code = Joi.string()
  .trim()
  .regex(zipCodeRegExp)
  .required()
  .messages(zipCodeMessages);

const contactSchema = (contact) => {
  const checkAddressObject = (key) => contact && contact[key];

  const schema = Joi.object()
    .keys({
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .allow('')
        .required()
        .messages(emailMessages),
      phone: Joi.string()
        .trim()
        .regex(phoneRegExp)
        .allow('')
        .required()
        .messages(phoneMessages),
      nip: Joi.string()
        .trim()
        .regex(nipRegExp)
        .allow('')
        .required()
        .messages(nipMessages),
      working_hours: Joi.string()
        .trim()
        .regex(workingHoursRegExp)
        .allow('')
        .required()
        .messages(workingHoursMessages),
      street: checkAddressObject('street_number') ? street : street.allow(''),
      street_number: checkAddressObject('street')
        ? street_number
        : street_number.allow(''),
      city: checkAddressObject('zip_code') ? city : city.allow(''),
      zip_code: checkAddressObject('city') ? zip_code : zip_code.allow(''),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(contact);

  return { schemaError, data };
};

module.exports = {
  contactSchema,
};
