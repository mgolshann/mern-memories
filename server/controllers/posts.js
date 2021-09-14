import PostMessage from './models/postMessage.js'

// get user posts
export const getPosts = async (_, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message})
    }
}

// create user post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (err) {
        console.log(err);
        res.status(409).json({ message: err.message })
    }
}