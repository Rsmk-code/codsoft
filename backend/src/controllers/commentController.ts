import { Request, Response, NextFunction } from '../types/express';
import Comment, { IComment } from "../models/commentModel";
import { StatusCodes } from "http-status-codes";

// Create a new comment 
const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { post, content } = req.body as IComment;
    const author = req.user?._id;

    try {
        const newComment = await Comment.create({ post, content, author });
        res.status(StatusCodes.CREATED).json({ data: newComment });
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

// Get all comments for a specific post
const getCommentsByPostId = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(comments);
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

// Get a comment by ID
const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;

    try {
        const commentToFind = await Comment.findById(commentId).populate('author');
        if (!commentToFind) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No comment with that id" });
        }
        res.status(StatusCodes.OK).json({ data: commentToFind });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Update a comment
const updateCommentById = async (req: Request, res: Response, next: NextFunction ) => {
    const commentId = req.params.id;
    const { content } = req.body as IComment;

    try {
        const updateComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true, runValidators: true }
        );
    
        if(!updateComment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No comment found for this Id!"})
        }

        res.status(StatusCodes.OK).json({data: updateComment });
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message})
    }
}

// Delete a comment by Id
const deleteCommentById = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;

    try {
        const deleteComment = await Comment.findByIdAndDelete(commentId);

        if (!deleteComment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No such comment exists!'});
        }

        res.status(StatusCodes.OK).json({ message: 'Comment deleted successfully' });
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}
export { createComment, getCommentsByPostId, getCommentById, updateCommentById, deleteCommentById }