import { Request, Response } from 'express';
import { UserZodSchema } from '../../types/user.types.js';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../lib/hashPassword.js';
import verifyPassword from '../../lib/verifyPassword.js';

export default class authControllers {
    static async register(req: Request, res: Response) {
        try {
            const { username, email, password } = UserZodSchema.parse(req.body);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword(password),
            });

            const isUserExist = await UserModel.findOne({ email });
            if (isUserExist) throw new Error('User already exist');

            const request = await newUser.save();
            res.json({ request });
        } catch (err) {
            res.status(400).json({ status: 400, message: (err as Error).message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) throw new Error('No user was found with that email address');
            const isCorrect = verifyPassword(password, user.password);

            if (isCorrect) res.json({user})
        } catch (err) {
            res.status(400).json({ status: 400, message: (err as Error).message });
        }
    }
}
