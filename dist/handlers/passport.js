"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model('User');
passport_1.default.use(User.createStrategy());
passport_1.default.serializeUser(User.serializeUser());
passport_1.default.deserializeUser(User.deserializeUser());
