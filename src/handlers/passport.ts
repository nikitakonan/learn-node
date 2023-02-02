import passport from 'passport';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const User = mongoose.model<User>('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ['HS512'],
    },
    function verify(payload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: payload.sub }, function (err, user) {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
