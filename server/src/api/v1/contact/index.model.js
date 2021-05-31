const Joi = require('joi');
const { nipMessages } = require('../../../helpers/errors/messages/nip');
const { phoneMessages } = require('../../../helpers/errors/messages/phone');
const { cityMessages } = require('../../../helpers/errors/messages/city');
const { streetMessages } = require('../../../helpers/errors/messages/street');
const {
  workingHoursMessages,
} = require('../../../helpers/errors/messages/hours');
const {
  zipCodeMessages,
} = require('../../../helpers/errors/messages/zip-code');
const {
  streetNumberMessages,
} = require('../../../helpers/errors/messages/street-number');
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
const {
  streetMinLength,
  streetMaxLength,
  cityMinLength,
  cityMaxLength,
} = require('../../../helpers/variables/contact');
const {
  STREET,
  STREET_NUMBER,
  CITY,
  ZIP_CODE,
} = require('../../../helpers/constants/contact');

const emailMessages = {
  ...emailRequired,
  ...emailString,
  ...emailPattern,
};

const street = Joi.string()
  .trim()
  .min(streetMinLength)
  .max(streetMaxLength)
  .required()
  .messages(streetMessages);

const street_number = Joi.string()
  .trim()
  .regex(streetNumberRegExp)
  .required()
  .messages(streetNumberMessages);

const city = Joi.string()
  .trim()
  .min(cityMinLength)
  .max(cityMaxLength)
  .required()
  .messages(cityMessages);

const zip_code = Joi.string()
  .trim()
  .regex(zipCodeRegExp)
  .required()
  .messages(zipCodeMessages);

const contactSchema = (contact) => {
  const checkAddressObject = (key) => contact && contact[key];

  const schema = Joi.object().keys({
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
    street: checkAddressObject(STREET_NUMBER) ? street : street.allow(''),
    street_number: checkAddressObject(STREET)
      ? street_number
      : street_number.allow(''),
    city: checkAddressObject(ZIP_CODE) ? city : city.allow(''),
    zip_code: checkAddressObject(CITY) ? zip_code : zip_code.allow(''),
  });

  const { error: schemaError, value: data } = schema.validate(contact);

  return { schemaError, data };
};

module.exports = contactSchema;
