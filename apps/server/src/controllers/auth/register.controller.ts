import type { Request, Response } from 'express';
import { UserZodSchema } from '../../types/user.types.js';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../utils/hashPassword.js';
import getUserWithoutPass from '../../utils/getUserWithoutPass.js';
import sendEmail from '../../service/sendEmail.service.js';

export async function registerController(req: Request, res: Response) {
    try {
        const { username, email, password } = UserZodSchema.parse(req.body);
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) throw new Error('User already exists');

        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = new UserModel({
            username,
            email,
            password: hashPassword(password),
        });

        newUser.verificationToken = token;
        newUser.verificationTokenExpire = new Date(Date.now() + 10 * 60 * 1000);

        // ? send email
        await sendEmail({  code: token, to: email, text: 'Text', subject: 'Verify account' });

        const savedUser = await newUser.save();
        const userWithoutPassword = getUserWithoutPass(savedUser);

        return res.json({ ok: true, message: 'User registered successfully', data: userWithoutPassword });
    } catch (err) {
        return res.status(400).json({ ok: false, message: (err as Error).message });
    }
}
