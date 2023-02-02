import { promisify } from 'es6-promisify';
import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import type { MappedError } from '../../types/MappedError';

const User = mongoose.model<User>('User');

export class UserController {
  validateRegister(req: Request, res: Response, next: NextFunction) {
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
    if (!errors) {
      next();
      return;
    }

    res.status(400).json({
      errors: errors,
      message: 'Validation error',
    });
  }
  async register(req: Request, _res: Response, next: NextFunction) {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
    });
    const register = promisify<User, User, string>(User.register.bind(User));
    await register(user, req.body.password);
    next();
  }
}
