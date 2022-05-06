import ErrorResponse from "../utils/ErrorResponse.js";

export const notFound = (req, _res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({
    result: false,
    error: err.message || "Server Error",
  });
};
