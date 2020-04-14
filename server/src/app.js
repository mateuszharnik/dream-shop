const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { CLIENT_URL } = require('./config');
const { notFound, errorHandler } = require('./middlewares/errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));

app.get('/', (req, res) => res.status(200).json({ message: '👽' }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
