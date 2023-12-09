import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_CONN_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tvuglph.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const SERVER_PORT = process.env.SERVER_PORT || 4001;

export const config = {
    mongo: {
        url: DB_CONN_STRING,
        DB_NAME: DB_NAME
    },
    server: {
        port: SERVER_PORT
    }
}