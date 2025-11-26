import type { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';
import verifyPassword from '../../lib/verifyPassword.js';
import createAccessToken from '../../lib/createJWT.js';

export async function loginController(req: Request, res: Response) {
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
