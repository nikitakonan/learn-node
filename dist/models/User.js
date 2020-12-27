"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_mongodb_errors_1 = __importDefault(require("mongoose-mongodb-errors"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const validator_1 = __importDefault(require("validator"));
mongoose_1.default.Promise = global.Promise;
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: `Please supply an email address`,
        trim: true,
        validate: [validator_1.default.isEmail, 'Invalid Email Address'],
    },
    name: {
        type: String,
        required: `Please supply a name`,
        trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hearts: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Store',
        },
    ],
});
userSchema.virtual('gravatar').get(function () {
    const hash = md5_1.default(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});
userSchema
    .plugin(passport_local_mongoose_1.default, { usernameField: 'email' })
    .plugin(mongoose_mongodb_errors_1.default);
exports.default = mongoose_1.default.model('User', userSchema);
