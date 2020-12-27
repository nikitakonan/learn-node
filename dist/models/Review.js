"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
const reviewSchema = new mongoose_1.default.Schema({
    created: {
        type: 'Date',
        default: Date.now,
    },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: 'You must supply an author',
    },
    store: {
        type: mongoose_1.default.Types.ObjectId,
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
function autopopulate(next) {
    this.populate('author');
    next();
}
reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);
exports.default = mongoose_1.default.model('Review', reviewSchema);
