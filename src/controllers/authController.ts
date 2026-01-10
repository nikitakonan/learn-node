import crypto from 'crypto';
import { promisify } from 'es6-promisify';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { send as sendMail } from '../handlers/mail';
import { type User } from '../models/User';

const UserModel = mongoose.model<User>('User');

export const login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed login!',
  successRedirect: '/',
  successFlash: 'You are now logged in',
}) as RequestHandler;

export const logout: RequestHandler = (req, res) => {
  req.logout(() => {});
  req.flash('success', 'You are logged out');
  res.redirect('/');
};

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You must be logged in');
  res.redirect('/login');
};

export const forgot: RequestHandler = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'There is no such user');
    return res.redirect('/login');
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await sendMail({
    user,
    resetURL,
    subject: 'Password Reset',
    filename: 'password-reset',
  });
  req.flash('success', `Reset password link was sent to your email`);
  res.redirect('/login');
};

export const reset: RequestHandler = async (req, res) => {
  const user = await UserModel.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  res.render('reset', { title: 'Reset password' });
};

export const confirmedPasswords: RequestHandler = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  req.flash('error', 'passwords do not match');
  res.redirect(req.get('Referrer') || '/');
};

export const update: RequestHandler = async (req, res) => {
  const user = await UserModel.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword.bind(user));
  await setPassword(req.body.password);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();

  const login = req.login as (user: User) => Promise<void>;
  await login(updatedUser);
  req.flash('success', 'Nice! Your password has been reset');
  res.redirect('/');
};
