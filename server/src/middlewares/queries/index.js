const getSkipAndLimit = (req, res, next) => {
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  skip = skip < 0 ? 0 : skip;

  limit = Math.min(50, Math.max(1, limit));

  req.data.skip = Number(skip);
  req.data.limit = Number(limit);

  next();
};

module.exports = {
  getSkipAndLimit,
};
