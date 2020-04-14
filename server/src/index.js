const { PORT } = require('./config');
const app = require('./app');

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
