import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost, disLikePost } from '../controllers/posts.js'

const router = express.Router();
// CRUD routes
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

// like & dislike routes
router.patch('/:id/likePost', likePost)
router.patch('/:id/disLikePost', disLikePost)

export default router;