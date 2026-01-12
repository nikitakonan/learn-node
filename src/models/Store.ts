import mongoose, { type Document, type Model, type Types } from 'mongoose';
import slug from 'slugs';

export interface Store extends Document {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  created: Date;
  location: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  photo: string;
  author: Types.ObjectId;
}

export interface StoreModel extends Model<Store> {
  getTagsList(): Promise<Store[]>;
  getTopStores(): Promise<Store[]>;
}

const locationSchema = new mongoose.Schema<Store['location']>(
  {
    type: {
      type: mongoose.Schema.Types.String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: `You must supply coordinates!`,
      },
    ],
    address: {
      type: String,
      required: [true, `You must supply an address`],
    },
  },
  { _id: false },
);

const storeSchema = new mongoose.Schema<Store>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now,
  },
  location: locationSchema,
  photo: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must supply an author'],
  },
});

storeSchema.index({
  name: 'text',
  description: 'text',
});

storeSchema.index({
  location: '2dsphere',
});

storeSchema.pre<Store>('save', async function () {
  if (!this.isModified('name')) {
    return;
  }
  this.slug = slug(this.name);

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storeConstructor = this.constructor as Model<Store>;
  const storesWithSlug = await storeConstructor.find({ slug: slugRegEx });

  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
});

storeSchema.statics.getTagsList = function () {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
  ]);
};

storeSchema.statics.getTopStores = function () {
  return this.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'store',
        as: 'reviews',
      },
    },
    { $match: { 'reviews.1': { $exists: true } } },
    { $addFields: { averageRating: { $avg: '$reviews.rating' } } },
    { $sort: { averageRating: -1 } },
    { $limit: 8 },
  ]);
};

storeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'store',
});

function autoPopulate(this: Store) {
  this.populate('reviews');
}

storeSchema.pre('find', autoPopulate);
storeSchema.pre('findOne', autoPopulate);

export default mongoose.model<Store, StoreModel>('Store', storeSchema);
