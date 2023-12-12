import express from 'express';
import { protect } from '../middlewares/requireAuth';
import { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById } from '../controllers/blogController';

const router = express.Router()

router.use(protect)
// post a new blog
router.post('/', createBlog)

// get all blogs
router.get('/', getAllBlogs)

// get blog by Id
router.get('/:id', getBlogById)

// update blog by Id
router.put('/:id', updateBlogById)

// delete blog by Id
router.delete('/:id', deleteBlogById)
export default router;