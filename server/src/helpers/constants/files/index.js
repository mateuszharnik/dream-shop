const { PORT } = require('../../../config');

const AVATAR_MAX_SIZE = 1024 * 1024 * 5;
const THUMBNAIL_MAX_SIZE = 1024 * 1024 * 5;

const PATH = `http://localhost:${PORT}`;

const PATH_TO_FILE_NOT_CORRECT = 'Ścieżka do pliku jest nieprawidłowa.';
const PATH_TO_FILE_REQUIRED = 'Ścieżka do pliku nie może być pusta.';

const FILE_TYPE_NOT_CORRECT = 'Typ pliku jest nieprawidłowy.';
const FILE_TYPE_REQUIRED = 'Musisz podać typ pliku.';

const FILE_SIZE_MAX = 'Plik nie może ważyć więcej niż 5 MB.';

module.exports = {
  PATH,
  AVATAR_MAX_SIZE,
  THUMBNAIL_MAX_SIZE,
  PATH_TO_FILE_NOT_CORRECT,
  PATH_TO_FILE_REQUIRED,
  FILE_TYPE_NOT_CORRECT,
  FILE_TYPE_REQUIRED,
  FILE_SIZE_MAX,
};
