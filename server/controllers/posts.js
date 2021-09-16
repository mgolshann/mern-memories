import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

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
    const { title, message, selectedFile, creator, tags } = req.body;
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

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
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send("no id found for this post")
    try {
        // first find the post by postId
        const post = await PostMessage.findById(_id)
        // update the like count with post id
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {
            typeLike:  (post.typeLike === null)  ? "like" : (post.typeLike === "disLike") ? "like" : null,
            likeCount: (post.typeLike === null) ? post.likeCount + 1 : 
                       (post.typeLike === 'like')  ? post.likeCount - 1 : post.likeCount + 1,
            disLikeCount: (post.typeLike === 'disLike' ? post.disLikeCount - 1 : post.disLikeCount)
        }, { new: true })

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

        // update the dislike count with post id
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {
            typeLike:  (post.typeLike === null)  ? "disLike" : (post.typeLike === "like") ? "disLike" : null,
            disLikeCount: (post.typeLike === null) ? post.disLikeCount + 1 : 
                       (post.typeLike === 'disLike')  ? post.disLikeCount - 1 : post.disLikeCount + 1,
            likeCount: (post.typeLike === 'like' ? post.likeCount - 1 : post.likeCount)
        }, { new: true })

        // return the updated post
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(401).json({ message: errror })
    }
}