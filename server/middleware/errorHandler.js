

const errorHandler = (error, req, res, next) => {
  // Express knows this is an error handler because it has 4 parameters
  // Normal middleware has (req, res, next) — error handlers add "error" at the start

  // If someone already sent a status code (like 404), use that
  // Otherwise, default to 500 (Internal Server Error)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log the error in the terminal so we can see what went wrong
  console.error("Error:", error.message);

  // Send a JSON response back to whoever made the request
  res.status(statusCode).json({
    success: false,

    // Send the error message
    message: error.message || "Something went wrong on the server",

    // Only show the detailed error "stack trace" during development
    // In production (live website), we hide it for security
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

module.exports = errorHandler;

// ============================================================
// BEGINNER MISTAKES TO AVOID:
// ❌ Don't forget to add this middleware AFTER your routes in server.js
//    (Express reads middleware top to bottom, so order matters!)
// ❌ Don't forget all 4 parameters (error, req, res, next) —
//    Express only recognizes it as an error handler with exactly 4
// ❌ Don't return sensitive error details in production
// ============================================================
