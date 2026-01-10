import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { promisify } from 'es6-promisify';
import flash from 'connect-flash';
import expressValidator from 'express-validator';
import routes from './routes/index';
import apiRoutes from './routes/apiRouter';
import apiV2Routes from './routes/v2/apiRouter';
import * as helpers from './helpers';
import {
  notFound,
  flashValidationErrors,
  developmentErrors,
  productionErrors,
} from './handlers/errorHandlers';
import './handlers/passport';

// create our Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(morgan('tiny'));
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET!,
    name: process.env.KEY!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, _res, next) => {
  req.login = promisify(req.login.bind(req));
  next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/apiV2', apiV2Routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);

// done! we export it so we can start the site in start.js
export default app;
