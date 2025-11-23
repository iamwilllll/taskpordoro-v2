import mongoose from 'mongoose';
import colors from 'colors';
import config from './config.js';

export default class Database {
    static async connect() {
        try {
            const URL = config.database.url;
            if (!URL) throw new Error('Database URL is not available');
            const { connection } = await mongoose.connect(URL);

            console.log(colors.cyan.bold(`Database connection was successful on ${connection.host}:${connection.port}`));
        } catch (err) {
            console.error(err);
        }
    }
}
