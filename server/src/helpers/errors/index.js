const responseWithError = (res, next, status, message) => {
  const error = new Error(message);
  res.status(status);
  next(error);
};

module.exports = {
  responseWithError,
};
