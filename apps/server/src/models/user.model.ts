import mongoose, { Schema } from 'mongoose';
import { UserT } from '../types/user.types.js';

const UserSchema = new Schema<UserT>(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, toLowerCase: true },
        password: { type: String, required: true, trim: true },

        verified: { type: Boolean, default: false },
        verificationToken: { type: String },
        verificationTokenExpire: { type: Number },

        resetToken: { type: String },
        resetTokenExpire: { type: Number },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<UserT>('Users', UserSchema);
export default UserModel;
