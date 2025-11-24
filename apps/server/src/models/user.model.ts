import mongoose, { Schema } from 'mongoose';
import { UserT } from '../types/user.types.js';

const UserSchema = new Schema<UserT>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },

        resetToken: {
            type: String,
            required:false

        },

        resetTokenExpire: {
            type: Number,
            required:false
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<UserT>('Users', UserSchema);
export default UserModel;
