const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 400;
  const message = error.message || "Something went wrong";

  return res.status(statusCode).json({ statusCode, message });
};

module.exports = errorHandler;
