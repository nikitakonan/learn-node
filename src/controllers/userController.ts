import mongoose from 'mongoose';
import { type PassportLocalMongooseModel } from 'passport-local-mongoose'
import { RequestHandler } from 'express';
import { type User } from '../models/User';
import { MappedError } from '../types/MappedError';

const UserModel = mongoose.model<User, PassportLocalMongooseModel<User>>('User');

export const loginForm: RequestHandler = (_req, res) => {
  res.render('login', { title: 'Login' });
};

export const registerForm: RequestHandler = (_req, res) => {
  res.render('register', { title: 'Register' });
};

export const validateRegister: RequestHandler = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be blank!').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed password cannot be blank')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors() as MappedError[];
  if (errors) {
    req.flash(
      'error',
      errors.map((err) => err.msg)
    );
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next();
};

export const register: RequestHandler = async (req, _res, next) => {
  const user = new UserModel({
    email: req.body.email,
    name: req.body.name,
  });
  await UserModel.register(user, req.body.password);
  next();
};

export const account: RequestHandler = (_req, res) => {
  res.render('account', { title: 'Edit your account' });
};

export const updateAccount: RequestHandler = async (req, res) => {
  const user = req.user as User;
  const updates = {
    name: req.body.name,
    email: req.body.email,
  };

  await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  req.flash('success', 'Successfully updated');
  res.redirect('/account');
};
