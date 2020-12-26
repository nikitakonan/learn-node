import passport from 'passport';
import mongoose from 'mongoose';
import { User } from '../models/User';

const User = mongoose.model<User>('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
