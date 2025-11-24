import { Request, Response } from 'express';
import { UserT, UserZodSchema } from '../../types/user.types.js';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../lib/hashPassword.js';
import verifyPassword from '../../lib/verifyPassword.js';
import createAccessToken from '../../lib/createJWT.js';

export default class authControllers {
    static async register(req: Request, res: Response) {
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
            return res.status(400).json({ success: false, message: (err as Error).message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userFound = await UserModel.findOne({ email });
            if (!userFound) throw new Error('Invalid credentials');

            const isMatch = verifyPassword(password, userFound.password);
            if (!isMatch) throw new Error('Incorrect password');

            const token = await createAccessToken({ _id: userFound._id });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPassword } = userFound.toObject();

            return res.json({
                success: true,
                message: 'Login successful',
                data: userWithoutPassword,
            });
        } catch (err) {
            return res.status(400).json({ success: false, message: (err as Error).message });
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            res.cookie('token', '', {
                expires: new Date(0),
                httpOnly: true,
                sameSite: 'strict',
            });

            return res.json({
                success: true,
                message: 'Logout successful',
            });
        } catch (err) {
            return res.status(400).json({ success: false, message: (err as Error).message });
        }
    }

    static async profile(req: Request, res: Response) {
        try {
            const { _id } = req.user as UserT;

            const userFound = await UserModel.findById(_id);
            if (!userFound) throw new Error('User not found');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPassword } = userFound.toObject();

            return res.json({ success: true, data: userWithoutPassword });
        } catch (err) {
            return res.status(500).json({ success: false, message: (err as Error).message });
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) throw new Error('User not found');

            const token = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = Date.now() + 10 * 60 * 1000;

            user.resetToken = token;
            user.resetTokenExpire = expires;
            await user.save();

            //? TODO: enviar token por correo

            return res.json({ success: true, message: 'Reset token generated' });
        } catch (err) {
            return res.status(500).json({ success: false, message: (err as Error).message });
        }
    }

    //* VALIDATE TOKEN
    static async validateToken(req: Request, res: Response) {
        try {
            const { token, email } = req.body;

            const user = await UserModel.findOne({
                email,
                resetToken: token,
                resetTokenExpire: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }

            return res.json({
                success: true,
                message: 'Valid token',
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: (err as Error).message });
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const { email, token, newPassword } = req.body;

            const user = await UserModel.findOne({
                email,
                resetToken: token,
                resetTokenExpire: { $gt: Date.now() },
            });

            if (!user) throw new Error('Invalid or expired token');

            user.password = hashPassword(newPassword);
            user.resetToken = undefined;
            user.resetTokenExpire = undefined;

            await user.save();

            return res.json({
                success: true,
                message: 'Password updated successfully',
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: (err as Error).message });
        }
    }
}
