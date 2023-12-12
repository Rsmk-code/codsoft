import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
    post: Types.ObjectId;
    content: string;
    author: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
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


const Comment = mongoose.model<IComment>('User', commentSchema);

export default Comment;