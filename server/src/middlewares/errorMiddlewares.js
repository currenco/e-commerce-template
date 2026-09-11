class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statuscode = err.statuscode || 500;

  if (err.code === 11000) {
    const message = 'Duplicate field value entered!';
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON Web Token is invalid, try again';
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token is invalid, try again';
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
      .map(error => error.message)
      .join(' ')
    : err.message;
  return res.status(err.statuscode, {
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
