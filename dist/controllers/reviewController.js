"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Review = mongoose_1.default.model('Review');
const addReview = async (req, res) => {
    const user = req.user;
    req.body.author = user._id;
    req.body.store = req.params.id;
    const newReview = new Review(req.body);
    await newReview.save();
    req.flash('success', 'Review Saved!');
    res.redirect(req.get("Referrer") || "/");
};
exports.addReview = addReview;
