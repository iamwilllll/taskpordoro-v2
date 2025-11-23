import { CorsOptions } from 'cors';
import 'dotenv/config';

const config = {
    port: process.env.PORT || 3000,
    url: process.env.BASE_URL || '',

    jwt: {
        api_key: process.env.JWT_API_KEY || '',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },

    database: {
        url: process.env.DATABASE_URL || '',
    },
} as const;

//? cors

const whitelist = [config.url];
export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, false);

        if (whitelist.indexOf(origin) !== -1) return callback(null, true);

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

export default config;
