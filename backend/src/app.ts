import express, { Request, Response, NextFunction } from "express";
import { config } from './config/config';
import connectToDatabase from "./db/connection";
import userRoutes from './routes/user'
const app = express();

//middleware
app.use(express.json())

//user
app.use('/api/user', userRoutes)

connectToDatabase();

export const server = app.listen(config.server.port, () => {
    console.log(`Server is running at http://localhost:${config.server.port}`);
})

export default app;