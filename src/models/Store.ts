import mongoose, { Document, HookNextFunction, Model, Types } from 'mongoose';
import slug from 'slugs';

mongoose.Promise = global.Promise;

export interface Store extends Document {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  created: Date;
  location: {
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
  location: {
    type: {
      type: String,
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
      required: `You must supply an address`,
    },
  },
  photo: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
});

storeSchema.index({
  name: 'text',
  description: 'text',
});

storeSchema.index({
  location: '2dsphere',
});

storeSchema.pre<Store>('save', async function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slug(this.name);

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storeConstructor = this.constructor as Model<Store>;
  const storesWithSlug = await storeConstructor.find({ slug: slugRegEx });

  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }

  next();
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

function autopopulate(this: Store, next: HookNextFunction) {
  this.populate('reviews');
  next();
}

storeSchema.pre('find', autopopulate);
storeSchema.pre('findOne', autopopulate);

export default mongoose.model<Store, StoreModel>('Store', storeSchema);
