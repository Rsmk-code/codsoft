import { NextFunction, Request, Response } from "../types/express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "../config/config";
import { StatusCodes } from "http-status-codes";

interface Decoded extends JwtPayload {
    id: string;
}

/**
 * Middleware used to protect routes from unauthorized users
 */
const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'You are not logged in. Please log in to access this route',
            });
            return;
        }

        const decoded = jwt.verify(token, config.jwt.secret) as Decoded;

        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: 'The user that belongs to this token does not exist anymore',
            });
            return;
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(error);
    }
};



export { protect };
