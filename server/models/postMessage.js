import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: [String],
    typeLike: {
        type: String,
        default: null
    },
    likeCount: {
        type: Number,
        default: 0
    },
    disLikeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: String,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage