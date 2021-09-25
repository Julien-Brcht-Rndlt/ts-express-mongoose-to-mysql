import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2/promise';
import dbConfig from './db-config';

//init mysql db connection (via mysql2/promise)

export const getConnection = async (): Promise<Connection> => {
    const connection = await mysql.createConnection(dbConfig);
    await connection.connect();
    return connection;
};