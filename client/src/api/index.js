import axios from 'axios';

const url = 'http://localhost:5000/posts';

// connect to server routes with axios
export const getPosts = () => axios.get(url) 
export const createPost = (newPost) => axios.post(url, newPost);  
export const updatePost = (currentPostId, updatedPost) => axios.patch(`${url}/${currentPostId}`, updatedPost);
export const deletePost = (postId) => axios.delete(`${url}/${postId}`);

// like & dislike post
export const likePost = (postId) => axios.patch(`${url}/${postId}/likePost`);
export const disLikePost = (postId) => axios.patch(`${url}/${postId}/disLikePost`);