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
const routes = require('./helpers/variables/routes');
const { notFound, errorHandler } = require('./middlewares/errors');
const { checkToken } = require('./middlewares/auth');
const { CLIENT_URL } = require('./config');
const { UPLOADS_DIR } = require('./helpers/variables/constants/directories');
const { V1 } = require('./helpers/variables/constants/api');
const { OK } = require('./helpers/variables/constants/status-codes');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(`/${UPLOADS_DIR}`, express.static(UPLOADS_DIR));
app.use(checkToken);

app.get(routes.home, (req, res) => res.status(OK).json({ message: '👽' }));

app.use(routes.auth, auth);
app.use(`${V1}${routes.socialMedia}`, socialMedia);
app.use(`${V1}${routes.contact}`, contact);
app.use(`${V1}${routes.about}`, about);
app.use(`${V1}${routes.users}`, users);
app.use(`${V1}${routes.faq}`, faq);
app.use(`${V1}${routes.faqCategories}`, faqCategories);
app.use(`${V1}${routes.newsletter}`, newsletter);
app.use(`${V1}${routes.map}`, map);
app.use(`${V1}${routes.messages}`, messages);
app.use(`${V1}${routes.products}`, products);
app.use(`${V1}${routes.comments}`, comments);
app.use(`${V1}${routes.productCategories}`, productCategories);
app.use(`${V1}${routes.productFilters}`, productFilters);
app.use(`${V1}${routes.regulations}`, regulations);
app.use(`${V1}${routes.orders}`, orders);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
