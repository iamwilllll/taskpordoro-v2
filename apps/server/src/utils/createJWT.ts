import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { Types } from 'mongoose';

export default async function createJWT(payload: { _id: Types.ObjectId }) {
    const secret = config.jwt.api_key;
    if (!secret) throw new Error('API key is not available');

    return new Promise<string | undefined>((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: '1d',
            },
            (err, token) => {
                if (err) reject(err);

                return resolve(token);
            }
        );
    });
}
