import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4001;

export const config = {
    server: {
        port: SERVER_PORT
    }
}