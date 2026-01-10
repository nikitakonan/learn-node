import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { type PassportLocalMongooseModel } from 'passport-local-mongoose'
import { type User } from '../../models/User';
import type { MappedError } from '../../types/MappedError';

const UserModel = mongoose.model<User, PassportLocalMongooseModel<User>>('User');

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
  async register(req: Request, res: Response) {
    const user = new UserModel({
      email: req.body.email,
      name: req.body.name,
    });

    try {
      await UserModel.register(user, req.body.password);
      res.status(204).send();
    } catch (e) {
      const error = e as { name: string; message: string };
      if (error.name === 'UserExistsError') {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }
  async updateAccount(req: Request, res: Response) {
    const user = req.user as User;
    const updates = {
      name: req.body.name,
      email: req.body.email,
    };

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    );

    res.json({ data: updatedUser });
  }
}
