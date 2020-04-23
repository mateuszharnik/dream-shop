const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./auth/index.router');
const socialMedia = require('./api/v1/social-media/index.router');
const contact = require('./api/v1/contact/index.router');
const about = require('./api/v1/about/index.router');
const newsletter = require('./api/v1/newsletter/index.router');
const faq = require('./api/v1/faq/index.router');
const map = require('./api/v1/map/index.router');
const users = require('./api/v1/users/index.router');
const messages = require('./api/v1/messages/index.router');
const { CLIENT_URL } = require('./config');
const { notFound, errorHandler } = require('./middlewares/errors');
const { checkToken } = require('./auth/index.middlewares');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use('/uploads', express.static('uploads'));
app.use(checkToken);

app.get('/', (req, res) => res.status(200).json({ message: '👽' }));

app.use('/auth', auth);
app.use('/v1/social-media', socialMedia);
app.use('/v1/contact', contact);
app.use('/v1/about', about);
app.use('/v1/users', users);
app.use('/v1/faq', faq);
app.use('/v1/newsletter', newsletter);
app.use('/v1/map', map);
app.use('/v1/messages', messages);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
