/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

import { ErrorRequestHandler, RequestHandler } from 'express';
import { ServerError } from '../types/ServerError';

export const catchErrors = (fn: RequestHandler): RequestHandler =>
  async function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/

export const notFound: RequestHandler = (_req, _res, next) => {
  const err = new ServerError('Not Found', 404);
  next(err);
};

/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

export const flashValidationErrors: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (!err.errors) return next(err);
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
  res.redirect('back');
};

/*
  Development Error Handler

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
export const developmentErrors: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  err.stack = err.stack || '';
  const errorDetails = {
    code: err.code,
    field: err.field,
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    ),
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
  });
};

/*
  Production Error Handler

  No stacktraces are leaked to user
*/
export const productionErrors: ErrorRequestHandler = (err, _req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
};
