import mongoose from 'mongoose';
import PostModel from '../models/posts.js';

/******* Get user posts **********************************/
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostModel.countDocuments({}); // get all number of documents
        const posts = await PostModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

{/* 
Query  ==> /posts?page=1 ==> page = 1 -> req.query
Params ==> /posts/:id    ==> id = 123 -> req.params
*/}

/******* get post by search **********************************/
export const getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        // convert it to Reqular Expression cause that way it is easier for mongoose to search in the Database
        const title = new RegExp(searchQuery, "i");

        // or stands for either find me the title or find me the tags 
        // $in stands for is there a tag in these specific array of tags that matches the query
        // we split the tags by a comma because we join them in the frontend
        const posts = await PostModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

/******* create user post **********************************/
export const createPost = async (req, res) => {

    if (!req.userId) { return res.status(401).json({ message: "Unauthenticated" }); }

    const post = req.body;
    const newPostMessage = new PostModel({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

/******* update post **********************************/
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id')

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

/******* Delete post **********************************/
export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("No found post with that id")
    try {
        await PostModel.findByIdAndDelete(_id)
        res.status(200).json({ message: "post deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error })
    }
}

/******* Like post **********************************/
export const likePost = async (req, res) => {

    // check user authorize or not
    if (!req.userId) return res.status(401).send("Unauthenticated")

    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send("no id found for this post")

    try {
        // first find the post by postId
        const post = await PostModel.findById(_id)

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
        const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true })

        // return the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(401).json({ message: errror })
    }
}

/******* Dislike post **********************************/
export const disLikePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send("no id found for this post")
    try {
        // first find the post by postId
        const post = await PostModel.findById(_id)

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
        const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true })

        // return the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(401).json({ message: errror })
    }
}