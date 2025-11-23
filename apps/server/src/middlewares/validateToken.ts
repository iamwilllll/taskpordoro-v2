import { Request, Response, NextFunction } from 'express';
import jwt, { type VerifyErrors } from 'jsonwebtoken';
import config from '../config/config.js';
import { UserT } from '../types/user.types.js';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
    const secret = config.jwt.api_key;
    const { token } = req.cookies;

    if (!secret) return res.status(500).json({ status: 500, message: 'Server error: API key missing' });
    if (!token) return res.status(401).json({ status: 401, message: 'Unauthorized' });

    jwt.verify(token, secret, (err: VerifyErrors | null, user: unknown) => {
        if (err) return res.status(401).json({ status: 401, message: 'Invalid token' });
        req.user = user as UserT;

        next();
    });
}
