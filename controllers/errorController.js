const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    messgae: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //operational, trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      messgae: err.message
    });
  }
  //Programmin or other unkown error: dont want to leak to the client
  else {
    //1) Log error
    console.error('ERROR', err);

    //2) Sendgeneric message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
