const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  console.error("Error:", error.message);

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong on the server",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

module.exports = errorHandler;
