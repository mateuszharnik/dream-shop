import StatusCodes from '@models/status-codes';

/* ====== Status Codes ====== */
export const OK = 200;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const FORBIDDEN = 403;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;

const statusCodes: StatusCodes = {
  OK,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
};

export default statusCodes;
