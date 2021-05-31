const app = require('./app');
const { SERVER_PORT } = require('./config');

// eslint-disable-next-line no-console
app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}`));
