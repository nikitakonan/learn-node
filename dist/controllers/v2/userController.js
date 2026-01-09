"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const es6_promisify_1 = require("es6-promisify");
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model('User');
class UserController {
    validateRegister(req, res, next) {
        req.sanitizeBody('name');
        req.checkBody('name', 'You must supply a name!').notEmpty();
        req.checkBody('email', 'That Email is not valid').isEmail();
        req.sanitizeBody('email').normalizeEmail({
            gmail_remove_dots: false,
            gmail_remove_subaddress: false,
        });
        req.checkBody('password', 'Password Cannot be blank!').notEmpty();
        req
            .checkBody('password-confirm', 'Confirmed password cannot be blank')
            .notEmpty();
        req
            .checkBody('password-confirm', 'Passwords do not match')
            .equals(req.body.password);
        const errors = req.validationErrors();
        if (!errors) {
            next();
            return;
        }
        res.status(400).json({
            errors: errors,
            message: 'Validation error',
        });
    }
    async register(req, res) {
        const user = new User({
            email: req.body.email,
            name: req.body.name,
        });
        const register = (0, es6_promisify_1.promisify)(User.register.bind(User));
        try {
            await register(user, req.body.password);
            res.status(204).send();
        }
        catch (e) {
            const error = e;
            if (error.name === 'UserExistsError') {
                res.status(400).json(error);
            }
            else {
                res.status(500).json(error);
            }
        }
    }
    async updateAccount(req, res) {
        const user = req.user;
        const updates = {
            name: req.body.name,
            email: req.body.email,
        };
        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $set: updates }, { new: true, runValidators: true, context: 'query' });
        res.json({ data: updatedUser });
    }
}
exports.UserController = UserController;
