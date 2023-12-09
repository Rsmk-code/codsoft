import express, { Request, Response, NextFunction } from "express";
import User, { IUser } from '../models/userModel';
import generateToken from "../utils/generateToken";
import {StatusCodes } from 'http-status-codes';
// login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as {
        email: string;
        password: string;
    }

    try {
        const user = await User.login(email, password)

        // create token 
        const token = generateToken(user._id)

        res.status(StatusCodes.OK).json({email, token})
    }catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

const signupUser = async (req: Request, res: Response, next: NextFunction) => { 
    const  { email, password } = req.body as {
        email: string;
        password: string;
    }

    try{
        const user = await User.signup(email, password) 

        // create a token 
        const token = generateToken(user._id)

        res.status(StatusCodes.OK).json({email, token})
    }catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

export { loginUser, signupUser }
