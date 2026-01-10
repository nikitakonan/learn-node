import passport from 'passport';
import mongoose from 'mongoose';
import {type PassportLocalMongooseModel} from 'passport-local-mongoose';
import {type User} from '../models/User';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';


const UserModel = mongoose.model<User, PassportLocalMongooseModel<User>>('User');
passport.use(UserModel.createStrategy());

const serializeUserFn = (UserModel.serializeUser() as unknown) as () => void;
passport.serializeUser(serializeUserFn);
passport.deserializeUser(UserModel.deserializeUser());

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ['HS512'],
    },
    async function verify(payload, done) {
      try {
        // We will assign the `sub` property on the JWT to the database ID of user
        const user = await UserModel.findOne({ _id: payload.sub });
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
