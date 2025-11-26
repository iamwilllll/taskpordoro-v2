import type { Request, Response } from 'express';
import { UserZodSchema } from '../../types/user.types.js';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../lib/hashPassword.js';

export async function registerController(req: Request, res: Response) {
    try {
        const { username, email, password } = UserZodSchema.parse(req.body);
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) throw new Error('User already exists');

        const newUser = new UserModel({
            username,
            email,
            password: hashPassword(password),
        });

        const savedUser = await newUser.save();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        return res.json({
            success: true,
            message: 'User registered successfully',
            data: userWithoutPassword,
        });
    } catch (err) {
        console.log('a')
        return res.status(400).json({ success: false, message: (err as Error).message });
    }
}
