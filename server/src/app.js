const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const auth = require('./auth/index.router');
const socialMedia = require('./api/v1/social-media/index.router');
const contact = require('./api/v1/contact/index.router');
const about = require('./api/v1/about/index.router');
const newsletter = require('./api/v1/newsletter/index.router');
const faq = require('./api/v1/faq/index.router');
const faqCategories = require('./api/v1/faq-categories/index.router');
const map = require('./api/v1/map/index.router');
const users = require('./api/v1/users/index.router');
const products = require('./api/v1/products/index.router');
const comments = require('./api/v1/comments/index.router');
const orders = require('./api/v1/orders/index.router');
const messages = require('./api/v1/messages/index.router');
const regulations = require('./api/v1/regulations/index.router');
const productCategories = require('./api/v1/product-categories/index.router');
const productFilters = require('./api/v1/product-filters/index.router');
const { CLIENT_URL } = require('./config');
const { notFound, errorHandler } = require('./middlewares/errors');
const { checkToken } = require('./auth/index.middlewares');
const {
  statusCodesConstants,
  directoriesConstants,
  routesConstants,
  apiVersionsConstants,
} = require('./helpers/constants');

const { V1 } = apiVersionsConstants;
const { OK } = statusCodesConstants;
const { UPLOADS } = directoriesConstants;
const {
  HOME,
  USERS,
  ABOUT,
  AUTH,
  SOCIAL_MEDIA,
  CONTACT,
  MAP,
  REGULATIONS,
  FAQ,
  FAQ_CATEGORIES,
  NEWSLETTER,
  MESSAGES,
  PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_FILTERS,
  COMMENTS,
  ORDERS,
} = routesConstants;

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(`/${UPLOADS}`, express.static(UPLOADS));
app.use(checkToken);

app.get(HOME, (req, res) => res.status(OK).json({ message: '👽' }));

app.use(AUTH, auth);
app.use(`${V1}${SOCIAL_MEDIA}`, socialMedia);
app.use(`${V1}${CONTACT}`, contact);
app.use(`${V1}${ABOUT}`, about);
app.use(`${V1}${USERS}`, users);
app.use(`${V1}${FAQ}`, faq);
app.use(`${V1}${FAQ_CATEGORIES}`, faqCategories);
app.use(`${V1}${NEWSLETTER}`, newsletter);
app.use(`${V1}${MAP}`, map);
app.use(`${V1}${MESSAGES}`, messages);
app.use(`${V1}${PRODUCTS}`, products);
app.use(`${V1}${COMMENTS}`, comments);
app.use(`${V1}${PRODUCT_CATEGORIES}`, productCategories);
app.use(`${V1}${PRODUCT_FILTERS}`, productFilters);
app.use(`${V1}${REGULATIONS}`, regulations);
app.use(`${V1}${ORDERS}`, orders);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
