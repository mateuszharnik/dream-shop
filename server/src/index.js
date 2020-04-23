const app = require('./app');
const { PORT } = require('./config');

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
