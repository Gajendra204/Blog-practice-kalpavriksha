import express from 'express';
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getBlogPosts);
router.post('/', authenticateUser, createBlogPost);
router.put('/:id', authenticateUser, updateBlogPost);
router.delete('/:id', authenticateUser, deleteBlogPost);

export default router;
