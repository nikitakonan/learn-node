"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugs_1 = __importDefault(require("slugs"));
mongoose_1.default.Promise = global.Promise;
const storeSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
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
storeSchema.pre('save', async function (next) {
    if (!this.isModified('name')) {
        return next();
    }
    this.slug = (0, slugs_1.default)(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storeConstructor = this.constructor;
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
function autopopulate(next) {
    this.populate('reviews');
    next();
}
storeSchema.pre('find', autopopulate);
storeSchema.pre('findOne', autopopulate);
exports.default = mongoose_1.default.model('Store', storeSchema);
