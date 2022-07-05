module.exports = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const env = process.env.NODE_ENV;

  console.log(error);
  res.status(statusCode).json({
    message: error.message,
    status: statusCode,
    stack: env === "development" ? error.stack : "Secret",
  });
};
