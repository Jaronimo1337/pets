class AppError extends Error {
    constructor(message, statusCode) {
      // message parameter belongs to parent class Error, we are passing it to parent class Error
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  
      // we are marking this error as operational
      this.isOperational = true;
  
      // we are capturing the stack trace, so we can see where the error happened
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  