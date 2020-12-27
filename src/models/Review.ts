import mongoose, { HookNextFunction, Document, Types } from 'mongoose';

mongoose.Promise = global.Promise;

export interface Review extends Document {
  created: Date;
  author: Types.ObjectId;
  store: Types.ObjectId;
  text: string;
  rating: number;
}

const reviewSchema = new mongoose.Schema({
  created: {
    type: 'Date',
    default: Date.now,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  store: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
    required: 'You must supply a store',
  },
  text: {
    type: String,
    required: 'Your review must have text',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

function autopopulate(this: Review, next: HookNextFunction) {
  this.populate('author');
  next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

export default mongoose.model<Review>('Review', reviewSchema);
