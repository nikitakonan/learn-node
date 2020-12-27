"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = exports.account = exports.register = exports.validateRegister = exports.registerForm = exports.loginForm = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const es6_promisify_1 = require("es6-promisify");
const User = mongoose_1.default.model('User');
const loginForm = (_req, res) => {
    res.render('login', { title: 'Login' });
};
exports.loginForm = loginForm;
const registerForm = (_req, res) => {
    res.render('register', { title: 'Register' });
};
exports.registerForm = registerForm;
const validateRegister = (req, res, next) => {
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
    if (errors) {
        req.flash('error', errors.map((err) => err.msg));
        res.render('register', {
            title: 'Register',
            body: req.body,
            flashes: req.flash(),
        });
        return;
    }
    next();
};
exports.validateRegister = validateRegister;
const register = async (req, res, next) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
    });
    const register = es6_promisify_1.promisify(User.register.bind(User));
    await register(user, req.body.password);
    next();
};
exports.register = register;
const account = (_req, res) => {
    res.render('account', { title: 'Edit your account' });
};
exports.account = account;
const updateAccount = async (req, res) => {
    const user = req.user;
    const updates = {
        name: req.body.name,
        email: req.body.email,
    };
    await User.findOneAndUpdate({ _id: user._id }, { $set: updates }, { new: true, runValidators: true, context: 'query' });
    req.flash('success', 'Successfully updated');
    res.redirect('/account');
};
exports.updateAccount = updateAccount;
