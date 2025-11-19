import 'dotenv/config';
import mongoose from 'mongoose';
import colors from 'colors';

const { DATABASE_URL } = process.env;
export default class Database {
    static async connect() {
        try {
            if (!DATABASE_URL) throw new Error('Database URL is not available');

            const { connection } = await mongoose.connect(DATABASE_URL);

            console.log(colors.cyan.bold(`Database connection was successful on ${connection.host}:${connection.port}`));
        } catch (err) {
            console.error(err);
        }
    }
}
