import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNext } from 'express';
import { IUser } from '../models/userModel';

interface User {
    user?: {
        _id: string; 
        username: string;
        fullname: string;
        email: string;
        password: string;
        profilePicture: string;
    };
}

export interface Request extends ExpressRequest, User {
    user?: IUser; 
}

export interface Response extends ExpressResponse, User {}

export type NextFunction = ExpressNext;