import type { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';

export async function registerValidateTokenController(req: Request, res: Response) {
    try {
        const { token, email } = req.body;

        const user = await UserModel.findOne({
            email,
            verificationToken: token,
            verificationTokenExpire: { $gt: Date.now() },
        });

        if (!user) return res.status(401).json({ ok: false, message: 'Invalid or expired token' });

        user.verified = true;
        user.save();

        return res.json({ ok: true, message: 'User validation was successful' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: (err as Error).message });
    }
}
