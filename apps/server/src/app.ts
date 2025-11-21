import express from 'express';
import Server from './config/server.js';
import Database from './config/db.js';
import appRouter from './routes/appRouter.js';

(async () => {
    await main();
    await Database.connect();
})();

async function main() {
    const server = Server.init();

    //* Middlewares
    server.use(express.json());

    //* Routes
    server.use('/api', appRouter);
}
