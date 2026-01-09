"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model('User');
function issueJWT(user) {
    const _id = user._id;
    const expiresIn = '1d';
    const now = new Date();
    const payload = {
        sub: _id,
        iat: Math.floor(Date.now() / 1000),
    };
    const signedToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
        algorithm: 'HS512',
    });
    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
        issued: now.toISOString(),
    };
}
exports.authenticate = passport_1.default.authenticate('jwt', {
    session: false,
});
const login = async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
    const user = await User.findOne({ email }); //'hash salt name'
    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: 'Could not find user' });
    }
    user.authenticate(pwd, (_, u, error) => {
        if (error) {
            return res.status(401).json(error);
        }
        const tokenObject = issueJWT(user);
        res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            issued: tokenObject.issued,
            user: {
                id: u._id,
                name: u.name,
                email: u.email,
                hearts: u.hearts,
            },
        });
    });
};
exports.login = login;
