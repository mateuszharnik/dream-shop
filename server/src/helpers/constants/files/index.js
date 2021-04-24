const { PORT } = require('../../../config');

const AVATAR_MAX_SIZE = 1024 * 1024 * 5;
const THUMBNAIL_MAX_SIZE = 1024 * 1024 * 5;

const PATH = `http://localhost:${PORT}`;

const PATH_TO_FILE_NOT_CORRECT = 'Ścieżka do pliku jest nieprawidłowa.';

module.exports = {
  PATH,
  AVATAR_MAX_SIZE,
  THUMBNAIL_MAX_SIZE,
  PATH_TO_FILE_NOT_CORRECT,
};
