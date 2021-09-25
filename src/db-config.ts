import mysql, { ConnectionOptions } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
};

export default dbConfig;