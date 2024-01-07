import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

export interface IUser extends Document {
    fullname: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
}

interface IUserModel extends Model<IUser> {
    signup(email: string, password: string, username: string, fullname: string, profilePicture?: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}

const emailValidator = (value: string) => validator.isEmail(value);
const urlValidator = (value: string) => validator.isURL(value);

const userSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true,
        validate: [
            {
                validator: (value: string) => validator.isLength(value, { min: 3 }),
                message: 'Fullname must be at least 3 characters long.',
            },
            {
                validator: (value: string) => !/\d/.test(value), 
                message: 'Fullname cannot contain numbers.',
            },
            {
                validator: (value: string) => /^[a-zA-Z\s]+$/.test(value), 
                message: 'Fullname can only contain letters and spaces.',
            },
        ],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: (value: string) => validator.isLength(value, { min: 3 }),
                message: 'Username must be at least 3 characters long.',
            },
            {
                validator: (value: string) => validator.matches(value, "^[a-zA-Z0-9_.-]*$"),
                message: 'Username can only contain letters, numbers, underscores, dots, and hyphens.',
            },
        ],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [emailValidator, 'Email is not valid.'],
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        validate: [urlValidator, 'Profile picture must be a valid URL.'],
    }
}, { timestamps: true });

userSchema.statics.signup = async function (email: string, password: string, fullname: string, username: string, profilePicture?: string) {
    try {
        if (!email || !password || !fullname || !username) {
            throw new Error('All fields must be filled.');
        }

        const exists = await this.findOne({ email });

        if (exists) {
            throw new Error('Email already in use.');
        }

        const existsUsername = await this.findOne({ username });

        if (existsUsername) {
            throw new Error('Username already in use');
        }

        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid.');
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
        }

        if (!validator.matches(username, "^[a-zA-Z0-9_.-]*$")) {
            throw new Error("Username can only contain letters, numbers, underscores, dots, and hyphens.");
        }

        if (!validator.isLength(fullname, { min: 3 })) {
            throw new Error('Fullname must be at least 3 characters long.');
        }

        if (/\d/.test(fullname)) {
            throw new Error('Fullname cannot contain numbers.');
        }

        if (profilePicture && !validator.isURL(profilePicture)) {
            throw new Error('Profile picture must be a valid URL.');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ email, password: hash, fullname, username });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.statics.login = async function (email: string, password: string) {
    try {
        if (!email || !password) {
            throw new Error('All fields must be filled.');
        }

        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('Incorrect username or password.');
        }

        const correctPw = await bcrypt.compare(password, user.password);

        if (!correctPw) {
            throw new Error('Incorrect username or password.');
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
