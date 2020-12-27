"use strict";
/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionErrors = exports.developmentErrors = exports.flashValidationErrors = exports.notFound = exports.catchErrors = void 0;
const catchErrors = (fn) => async function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
exports.catchErrors = catchErrors;
const notFound = (_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};
exports.notFound = notFound;
/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/
const flashValidationErrors = (err, req, res, next) => {
    if (!err.errors)
        return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
    res.redirect('back');
};
exports.flashValidationErrors = flashValidationErrors;
/*
  Development Error Handler

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
const developmentErrors = (err, _req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    };
    res.status(err.status || 500);
    res.format({
        // Based on the `Accept` http header
        'text/html': () => {
            res.render('error', errorDetails);
        },
        'application/json': () => res.json(errorDetails),
    });
};
exports.developmentErrors = developmentErrors;
/*
  Production Error Handler

  No stacktraces are leaked to user
*/
const productionErrors = (err, _req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
};
exports.productionErrors = productionErrors;
