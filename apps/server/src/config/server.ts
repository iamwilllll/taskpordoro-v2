import express, { Express } from 'express';
import colors from 'colors';
import config from './config.js';

export default class Server {
    static init(): Express {
        const PORT = config.port;
        if (!PORT) throw new Error('port is not available');

        const app = express();

        app.listen(PORT, () => console.log(colors.cyan.bold(`Server run on port ${PORT}`)));

        return app;
    }
}
