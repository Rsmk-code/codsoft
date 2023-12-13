import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    headline: string;
    picture: string;
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'User'
    },
    headline: {
        type: String,
        unique: true
    },
    picture: {
        type: String
    }
},
{ timestamps: true }
);


const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;