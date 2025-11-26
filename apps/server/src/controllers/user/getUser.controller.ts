import type { Request, Response } from 'express';
import { UserT } from '../../types/user.types.js';
import UserModel from '../../models/user.model.js';

export async function getUserController(req: Request, res: Response) {
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
