import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{ timestamps: true }
);


const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;