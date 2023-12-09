import express, { Request, Response, NextFunction } from "express";
import { config } from './config/config';
import connectToDatabase from "./db/connection";

const app = express();

app.use(express.json())

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
    res.send("Server is wroking")
})

export const server = app.listen(config.server.port, () => {
    console.log(`Server is running at http://localhost:${config.server.port}`);
})

export default app;