import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Review } from '../models/Review';
import { User } from '../models/User';

const Review = mongoose.model<Review>('Review');

export const addReview: RequestHandler = async (req, res) => {
  const user = req.user as User;
  req.body.author = user._id;
  req.body.store = req.params.id;

  const newReview = new Review(req.body);
  await newReview.save();
  req.flash('success', 'Review Saved!');
  res.redirect(req.get("Referrer") || "/");
};
