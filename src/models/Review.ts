import mongoose, { Document, Types } from 'mongoose';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
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

function autoPopulate(this: Review) {
  this.populate('author');
}

reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);

export default mongoose.model<Review>('Review', reviewSchema);
