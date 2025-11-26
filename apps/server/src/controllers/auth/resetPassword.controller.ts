import type { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../lib/hashPassword.js';

export async function resetPasswordController(req: Request, res: Response) {
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
