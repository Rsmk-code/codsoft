import express from 'express';
import { protect } from '../middlewares/requireAuth';
import { createComment, getCommentsByPostId, getCommentById, updateCommentById, deleteCommentById } from '../controllers/commentController';

const router = express.Router()

router.use(protect)
// post a new comment
router.post('/', createComment)

// get all comment by postId
router.get('/post/:postId', getCommentsByPostId )

// get comment by Id
router.get('/comment/:id', getCommentById)

// update comment by Id
router.put('/:id', updateCommentById)

// delete comment by Id
router.delete('/:id', deleteCommentById)
export default router;