/* eslint-disable no-shadow-restricted-names */
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

            //* new user
            const newUser = new UserModel({
                username,
                email,
                password: hashPassword(password),
            });

            const isUserExist = await UserModel.findOne({ email });
            if (isUserExist) throw new Error('User already exist');

            //* save user
            const savedUser = await newUser.save();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: undefined, ...userWithoutPassword } = savedUser.toObject();

            //* create token
            const token = await createAccessToken({ _id: savedUser._id });

            //* responses
            res.cookie('token', token);
            return res.json({ status: 200, message: 'The user login was successful', data: userWithoutPassword });
        } catch (err) {
            return res.status(500).json({ status: 500, message: (err as Error).message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userFound = await UserModel.findOne({ email });

            if (!userFound) throw new Error('Invalid credential');
            const isMatch = verifyPassword(password, userFound.password);

            //! error
            if (!isMatch) throw new Error('Incorrect password');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: undefined, ...userWithoutPassword } = userFound.toObject();

            //* create token
            const token = await createAccessToken({ _id: userFound._id });

            //* responses
            res.cookie('token', token);
            return res.json({ status: 200, message: 'The user login was successful', data: userWithoutPassword });
        } catch (err) {
            return res.status(400).json({ status: 400, message: (err as Error).message });
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            res.cookie('token', '', {
                expires: new Date(0),
            });

            return res.json({ status: 200, message: 'The user logout was successful' });
        } catch (err) {
            return res.status(400).json({ status: 400, message: (err as Error).message });
        }
    }

    static async profile(req: Request, res: Response) {
        try {
            const { _id } = req.user as UserT;

            const userFound = await UserModel.findOne({ _id });

            if (!userFound) throw new Error('User not found');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: undefined, ...userWithoutPassword } = userFound.toObject();

            return res.json(userWithoutPassword);
        } catch (err) {
            return res.status(404).json({ status: 404, message: 'User not found', error: err });
        }
    }
}
