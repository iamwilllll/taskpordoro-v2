import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Server from './config/server.js';
import Database from './config/db.js';
import appRouter from './routes/appRouter.js';
import { corsOptions } from './config/config.js';

(async () => {
    await main();
    await Database.connect();
})();

async function main() {
    const server = Server.init();

    //* Middlewares
    server.use(express.json());
    server.use(cookieParser());
    server.use(cors(corsOptions));

    //* Routes
    server.use('/api', appRouter);
}
