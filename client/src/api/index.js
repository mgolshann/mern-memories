import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// with interceptors we can add sth specifice to each of our request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

// connect to server routes with axios
export const getPosts = (page) => API.get(`/posts?page=${page}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (currentPostId, updatedPost) => API.patch(`posts/${currentPostId}`, updatedPost);
export const deletePost = (postId) => API.delete(`posts/${postId}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

// like & dislike post
export const likePost = (postId) => API.patch(`posts/${postId}/likePost`);
export const disLikePost = (postId) => API.patch(`posts/${postId}/disLikePost`);

// auth user
export const signin = (formData) => API.post('/user/signin', formData)
export const signup = (formData) => API.post('/user/signup', formData)