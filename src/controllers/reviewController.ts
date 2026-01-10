import { type RequestHandler } from 'express';
import mongoose from 'mongoose';
import { type Review } from '../models/Review';
import { type User } from '../models/User';

const ReviewModel = mongoose.model<Review>('Review');

export const addReview: RequestHandler = async (req, res) => {
  const user = req.user as User;
  req.body.author = user._id;
  req.body.store = req.params.id;

  const newReview = new ReviewModel(req.body);
  await newReview.save();
  req.flash('success', 'Review Saved!');
  res.redirect(req.get('Referrer') || '/');
};
