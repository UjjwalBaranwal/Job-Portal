class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  if (err.name === "CaseError") {
    const message = `Resource not Found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    // no duplication
    // 11000 => dupliaction error
    const message = `Duplicaton ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `JSON web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `JSON web Token is expired. Try again`;
    err = new ErrorHandler(message, 400);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
