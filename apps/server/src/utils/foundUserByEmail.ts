import UserModel from '../models/user.model.js';
import { UserT } from '../types/user.types.js';

export default async function foundUser(email: string): Promise<UserT> {
    const userFound = await UserModel.findOne({ email });
    if (!userFound) throw new Error('Invalid credentials');
    return userFound;
}
