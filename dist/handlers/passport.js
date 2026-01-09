"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_jwt_1 = require("passport-jwt");
const User = mongoose_1.default.model('User');
passport_1.default.use(User.createStrategy());
const serializeUserFn = User.serializeUser();
passport_1.default.serializeUser(serializeUserFn);
passport_1.default.deserializeUser(User.deserializeUser());
passport_1.default.use('jwt', new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS512'],
}, function verify(payload, done) {
    // We will assign the `sub` property on the JWT to the database ID of user
    User.findOne({ _id: payload.sub }, function (err, user) {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
