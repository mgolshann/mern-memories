import express from 'express';
import { posts } from './controllers/posts.js'

const router = express.Router();
router.get('/', posts)

export default router;