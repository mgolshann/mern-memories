import express from 'express';
import { signin, signup } from '../controllers/user.js'

const Router = express.Router();

Router.post('/signin', signin)
Router.post('/signup', signup)

export default Router