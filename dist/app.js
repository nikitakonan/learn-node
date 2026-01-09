"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const es6_promisify_1 = require("es6-promisify");
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_validator_1 = __importDefault(require("express-validator"));
const index_1 = __importDefault(require("./routes/index"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const apiRouter_2 = __importDefault(require("./routes/v2/apiRouter"));
const helpers = __importStar(require("./helpers"));
const errorHandlers_1 = require("./handlers/errorHandlers");
require("./handlers/passport");
const MongoStore = (0, connect_mongo_1.default)(express_session_1.default);
// create our Express app
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use((0, morgan_1.default)('tiny'));
// Takes the raw requests and turns them into usable properties on req.body
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use((0, express_validator_1.default)());
// populates req.cookies with any cookies that came along with the request
app.use((0, cookie_parser_1.default)());
// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    name: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
}));
// // Passport JS is what we use to handle our logins
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use((0, connect_flash_1.default)());
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
    req.login = (0, es6_promisify_1.promisify)(req.login.bind(req));
    next();
});
// After allllll that above middleware, we finally handle our own routes!
app.use('/', index_1.default);
app.use('/api', apiRouter_1.default);
app.use('/apiV2', apiRouter_2.default);
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers_1.notFound);
// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers_1.flashValidationErrors);
// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers_1.developmentErrors);
}
// production error handler
app.use(errorHandlers_1.productionErrors);
// done! we export it so we can start the site in start.js
exports.default = app;
