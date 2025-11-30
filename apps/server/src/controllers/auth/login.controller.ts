import type { Request, Response } from 'express';
import verifyPassword from '../../utils/verifyPassword.js';
import createAccessToken from '../../utils/createJWT.js';
import getUserWithoutPass from '../../utils/getUserWithoutPass.js';
import foundUserByEmail from '../../utils/foundUserByEmail.js';

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const userFound = await foundUserByEmail(email);

        const isMatch = verifyPassword(password, userFound.password);
        if (!isMatch) throw new Error('Invalid credentials');
        if (!userFound.verified) return res.status(401).json({ ok: false, message: 'User is not verified' });

        const token = await createAccessToken({ _id: userFound._id });
        const userWithoutPassword = getUserWithoutPass(userFound);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ ok: true, message: 'Login successful', data: userWithoutPassword });
    } catch (err) {
        return res.status(400).json({ ok: false, message: (err as Error).message });
    }
}
