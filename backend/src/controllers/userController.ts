import { Request, Response, NextFunction } from "express";
import User, { IUser } from '../models/userModel';
import generateToken from "../utils/generateToken";
import {StatusCodes } from 'http-status-codes';
// login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body as {
        email: string;
        password: string;
    }

    email = email.toLowerCase();
    
    try {
        const user = await User.login(email, password)

        // create token 
        const token = generateToken(user._id)
        
        res.status(StatusCodes.OK).json({email, username: user.username, token})
    }catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

const signupUser = async (req: Request, res: Response, next: NextFunction) => { 
    let  { email, password, fullname, username } = req.body as {
        email: string;
        password: string;
        username: string;
        fullname: string;
    }

    email = email.toLowerCase();
    fullname = fullname.replace(/\b\w/g, (char) => char.toUpperCase());
    
    try{
        const user = await User.signup(email, password, fullname, username) 

        // create a token 
        const token = generateToken(user._id)

        res.status(StatusCodes.OK).json({email, token})
    }catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
}

export { loginUser, signupUser }
