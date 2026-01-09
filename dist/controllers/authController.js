"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.confirmedPasswords = exports.reset = exports.forgot = exports.isLoggedIn = exports.logout = exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
const es6_promisify_1 = require("es6-promisify");
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const mail_1 = require("../handlers/mail");
const User = mongoose_1.default.model('User');
exports.login = passport_1.default.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed login!',
    successRedirect: '/',
    successFlash: 'You are now logged in',
});
const logout = (req, res) => {
    req.logout(() => { });
    req.flash('success', 'You are logged out');
    res.redirect('/');
};
exports.logout = logout;
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in');
    res.redirect('/login');
};
exports.isLoggedIn = isLoggedIn;
const forgot = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'There is no such user');
        return res.redirect('/login');
    }
    user.resetPasswordToken = crypto_1.default.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await (0, mail_1.send)({
        user,
        resetURL,
        subject: 'Password Reset',
        filename: 'password-reset',
    });
    req.flash('success', `Reset password link was sent to your email`);
    res.redirect('/login');
};
exports.forgot = forgot;
const reset = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }
    res.render('reset', { title: 'Reset password' });
};
exports.reset = reset;
const confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']) {
        next();
        return;
    }
    req.flash('error', 'passwords do not match');
    res.redirect('back');
};
exports.confirmedPasswords = confirmedPasswords;
const update = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }
    const setPassword = (0, es6_promisify_1.promisify)(user.setPassword.bind(user));
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    const login = req.login;
    await login(updatedUser);
    req.flash('success', 'Nice! Your password has been reset');
    res.redirect('/');
};
exports.update = update;
