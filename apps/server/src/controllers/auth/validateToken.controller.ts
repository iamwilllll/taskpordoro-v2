import type { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';

export async function validateTokenController(req: Request, res: Response) {
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
