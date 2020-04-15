const env = require('dotenv');
const Joi = require('@hapi/joi');

env.config();

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().trim().default('development').valid('development', 'production'),
  CLIENT_URL: Joi.string().trim().default('http://localhost:4200'),
  DB_URL: Joi.string().trim().default('localhost/dream-shop'),
  PORT: Joi.string().trim().default('3000'),
  SECRET: Joi.string().trim().required(),
}).unknown(true);

const { error, value: config } = envSchema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(`Missing property in config file: ${error.message}`);
  process.exit(1);
}

module.exports = config;
