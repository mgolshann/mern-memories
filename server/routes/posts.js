import express from 'express';
import auth from '../middlewares/auth.js';
import { getPostBySearch, getPosts, createPost, updatePost, deletePost, likePost, disLikePost } from '../controllers/posts.js'

const router = express.Router();
// CRUD routes
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

// like & dislike routes
router.patch('/:id/likePost', auth, likePost)
router.patch('/:id/disLikePost', auth, disLikePost)

// search routes
router.get('/search', getPostBySearch)

export default router;