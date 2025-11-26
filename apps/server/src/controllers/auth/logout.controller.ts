import type { Request, Response } from 'express';

export async function logoutController(req: Request, res: Response) {
    try {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.json({
            success: true,
            message: 'Logout successful',
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: (err as Error).message });
    }
}
