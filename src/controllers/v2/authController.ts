import { Request, RequestHandler, Response } from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../../models/User';

const User = mongoose.model<User>('User');

function issueJWT(user: User) {
  const _id = user._id;
  const expiresIn = '1d';

  const now = new Date();

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expiresIn,
    algorithm: 'HS512',
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
    issued: now.toISOString(),
  };
}

export const authenticate = passport.authenticate('jwt', {
  session: false,
}) as RequestHandler;

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const pwd = req.body.password;
  const user = await User.findOne({ email }); //'hash salt name'

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: 'Could not find user' });
  }
  user.authenticate(pwd, (_, u: User, error) => {
    if (error) {
      return res.status(401).json(error);
    }
    const tokenObject = issueJWT(user);
    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      issued: tokenObject.issued,
      user: {
        id: u._id,
        name: u.name,
        email: u.email,
      },
    });
  });
};
