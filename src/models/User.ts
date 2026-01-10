import md5 from 'md5';
import mongoose, { Schema, Types } from 'mongoose';
import passportLocalMongoose, {
  type PassportLocalMongooseDocument,
  type PassportLocalMongooseModel,
  type PassportLocalMongooseOptions,
} from 'passport-local-mongoose';
import validator from 'validator';

export interface User extends PassportLocalMongooseDocument {
  email: string;
  name: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date | number;
  hearts: Types.ObjectId[];
}

const userSchema = new Schema<User, PassportLocalMongooseModel<User>>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please supply an email address'],
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
  },
  name: {
    type: String,
    required: [true, 'Please supply a name'],
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

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' } satisfies PassportLocalMongooseOptions);

export default mongoose.model<User>('User', userSchema);
