import jwt from 'jsonwebtoken';

const generateToken = (id: string | number): string | undefined => {
    if (process.env.JWT_SECRET){
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d' 
        })
    }else {
        console.error('JWT_SECRET is not defined in the environment variables.');
        return undefined;
    }
}

export default generateToken;