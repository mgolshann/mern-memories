import mongoose from 'mongoose';
import PostMessage from '../models/posts.js';

// get user posts
export const getPosts = async (_, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

// create user post
export const createPost = async (req, res) => {

    if (!req.userId) { return res.status(401).json({ message: "Unauthenticated" }); }

    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

// update post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id')

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// delete post
export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("No found post with that id")
    try {
        await PostMessage.findByIdAndDelete(_id)
        res.status(200).json({ message: "post deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error })
    }
}

// like post 
export const likePost = async (req, res) => {

    // check user authorize or not
    if (!req.userId) return res.status(401).send("Unauthenticated")

    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send("no id found for this post")

    try {
        // first find the post by postId
        const post = await PostMessage.findById(_id)

        // check if the userId exist in post likes or not
        const index = post.likes.findIndex(id => id === String(req.userId))

        if (index === -1) { // userId not exist in the post likes
            // add userId to post likes
            post.likes.push(req.userId)

            // delete post dislike when user use like button
            post.dislikes = post.dislikes.filter(id => id !== String(req.userId))
        } else {
            // delete userId from post likes
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        // update the like count with post id
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        // return the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(401).json({ message: errror })
    }
}

// dislike post 
export const disLikePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send("no id found for this post")
    try {
        // first find the post by postId
        const post = await PostMessage.findById(_id)
        
        // check if the userId exist in post dislikes or not
        const index = post.dislikes.findIndex(id => id === String(req.userId))

        if (index === -1) {
            // add userId to post dislikes
            post.dislikes.push(req.userId)

            // delete post like when user use dislike button
            post.likes = post.likes.filter(id => id !== String(req.userId))
        } else {
            // delete userId from post dislikes
            post.dislikes = post.dislikes.filter(id => id !== String(req.userId))
        }


        // update the dislike count with post id
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        // return the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(401).json({ message: errror })
    }
}