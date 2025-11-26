import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Server from './config/server.js';
import Database from './config/db.js';
import { corsOptions } from './config/config.js';
import { authRoutes, userRoutes } from './routes/index.js';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* Middlewares
    server.use(express.json());
    server.use(cookieParser());
    server.use(cors(corsOptions));

    //* Routes
    server.get('/api', (req, res) => {
        res.json({ message: 'wilfryn' });
    });
    server.use('/api', authRoutes);
    server.use('/api', userRoutes);

    //* Listen server
    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}
