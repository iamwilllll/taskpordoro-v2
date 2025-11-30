import type { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';
// import sendEmail from '../../service/sendEmail.service.js';

export async function forgotPasswordController(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new Error('User not found');

        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000);

        user.resetToken = token;
        user.resetTokenExpire = expires;
        await user.save();

        //? TODO: enviar token por correo
        console.log(token);
        // await sendEmail({ code: token, to: email, text: 'Text', subject: 'text' });

        return res.json({ ok: true, message: 'Reset token generated' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: (err as Error).message });
    }
}
