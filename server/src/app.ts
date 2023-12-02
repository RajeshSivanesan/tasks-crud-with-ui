import express, { Express } from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import config from './config/config';
import morgan from './modules/logger/morgan';
import rateLimit from 'express-rate-limit';
import { ApiError, errorConverter, errorHandler } from './modules/errors';
import taskRoutes from './router/task';
import userRoutes from './router/user';

const app: Express = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));

// parse json request body
app.use(express.json());

// sanitize request data
// Validate and sanitize the user input using the xss library
app.use(xss());
app.use(ExpressMongoSanitize({
  allowDots: true,
  replaceWith: '_',
  onSanitize: ({ req, key }: any) => {
    console.warn(`This request[${key}] is sanitized`);
  }
}));

// gzip compression
app.use(compression());

// Set up rate limiting using the express-rate-limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Apply rate limiting to all routes
app.use(limiter);

// api routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;