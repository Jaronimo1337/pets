const express = require('express');
const invoiceRouter = require('./routes/invoiceRoute');
const userRouter = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const errStatus = err.status || 'error'; 
  const errMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: errStatus,
    message: errMessage,
  });
});

module.exports = app;