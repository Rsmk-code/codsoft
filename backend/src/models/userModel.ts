import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import  validator  from 'validator';
export interface IUser extends Document {
    fullname: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
}

interface IUserModel extends Model<IUser> {
    signup(email: string, password: string, username: string, fullname: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
  }

const userSchema = new Schema<IUser>({
    fullname: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    }
},
{ timestamps: true }
);

// static signup method
userSchema.statics.signup = async function(email: string, password: string, fullname: string, username: string) {

    // validation
    if(!email || !password || !fullname || !username) {
        throw Error('All fields must be filled.')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use.')
    }

    const existsUsername = await this.findOne({ username })

    if (existsUsername) {
        throw Error('Username already in use');
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid.')
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Please enter a strong password.")
    }

    if (!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")) {
        throw Error("Username is not valid.")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, fullname, username })
    
    return user
}

// static login method 
userSchema.statics.login = async function (email: string, password: string) {
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect username or password.')
    }

    const correctPw = await bcrypt.compare(password, user.password)

    if (!correctPw) {
        throw Error ('Incorrect username or password.')
    }

    return user
}

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;