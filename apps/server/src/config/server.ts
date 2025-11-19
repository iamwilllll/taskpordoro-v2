import 'dotenv/config';
import express, { Express } from 'express';
import colors from 'colors';

export default class Server {
    static init(): Express {
        const PORT = process.env.PORT || 3000;

        const app = express();
        app.listen(PORT, () => console.log(colors.cyan.bold(`Server run on port ${PORT}`)));

        return app;
    }
}
