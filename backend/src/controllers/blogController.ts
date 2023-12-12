import { Request, Response, NextFunction } from '../types/express';
import Blog, { IBlog } from '../models/blogModel';
import { StatusCodes } from 'http-status-codes';

// Create a new blog post
const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body as IBlog;
    const user_id = req.user?._id;

    try {
        const newBlog = await Blog.create({ title, content, author: user_id });
        res.status(StatusCodes.CREATED).json({ data: newBlog });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all blog posts
const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?._id;
        const blogs = await Blog.find({ author: user_id }).sort({createAt: -1})
        res.status(StatusCodes.OK).json(blogs);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Get a blog by ID
const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;

    try{
        const blogToFind = await Blog.findById(blogId).populate('author');
        if (!blogToFind) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No blog with that id"});
        }
        res.status(StatusCodes.OK).json({ data: blogToFind })
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

// Update a blog post
const updateBlogById = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const { title, content } = req.body as IBlog;

    try {
        const updateBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true, runValidators: true } // Return the updated document
        );
        if(!updateBlog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No blog found for this id!"})
        }

        res.status(StatusCodes.OK).json({ data: updateBlog })
    }catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }

    };

// Delete blog by Id
const deleteBlogById = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(!deletedBlog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No blog found for this id!' });
        }

        res.status(StatusCodes.OK).json({ message: 'Blog deleted successfully' })
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}


export { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById };