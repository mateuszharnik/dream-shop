const { PORT } = require('../../../config');

const AVATAR_MAX_SIZE = 1024 * 1024 * 5;
const THUMBNAIL_MAX_SIZE = 1024 * 1024 * 5;

const PATH = `http://localhost:${PORT}`;
module.exports = {
  PATH,
  AVATAR_MAX_SIZE,
  THUMBNAIL_MAX_SIZE,
};
