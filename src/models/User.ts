import md5 from 'md5';
import mongoose, { PassportLocalDocument, Schema, Types } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose';
import validator from 'validator';

mongoose.Promise = global.Promise;

export interface User extends PassportLocalDocument {
    email: string;
    name: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date | number;
    hearts: Types.ObjectId[];
}

const userSchema = new Schema<User>({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: `Please supply an email address`,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
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
            type: mongoose.Types.ObjectId,
            ref: 'Store',
        },
    ],
});

userSchema.virtual('gravatar').get(function (this: User) {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema
    .plugin(passportLocalMongoose, { usernameField: 'email' })
    .plugin(mongodbErrorHandler);

export default mongoose.model<User>('User', userSchema);
