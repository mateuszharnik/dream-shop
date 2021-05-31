const env = require('dotenv');
const Joi = require('joi');
const { emailRegExp } = require('../helpers/regexp');
const { missingPropertyMessage } = require('../helpers/variables/config');
const {
  passwordMinLength,
  passwordMaxLength,
} = require('../helpers/variables/users');
const {
  DEFAULT_PORT,
  DEFAULT_CLIENT_URL,
  DEFAULT_DB_URL,
  DEV,
  PRODUCTION,
} = require('../helpers/constants/config');

env.config();

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().trim().default(DEV).valid(DEV, PRODUCTION),
    CLIENT_URL: Joi.string().trim().default(DEFAULT_CLIENT_URL),
    DB_URL: Joi.string().trim().default(DEFAULT_DB_URL),
    PORT: Joi.string().trim().default(DEFAULT_PORT),
    SECRET: Joi.string().trim().required(),
    ADMIN_EMAIL: Joi.string().trim().regex(emailRegExp).required(),
    ADMIN_PASSWORD: Joi.string()
      .trim()
      .min(passwordMinLength)
      .max(passwordMaxLength)
      .required(),
    EMAIL_LOGIN: Joi.string().trim(),
    EMAIL_HOST: Joi.string().trim(),
    EMAIL_PORT: Joi.string().trim(),
    EMAIL_PASSWORD: Joi.string().trim(),
  })
  .unknown(true);

const { error, value: config } = envSchema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(`${missingPropertyMessage}: ${error.message}`);
  process.exit(1);
}

module.exports = config;
