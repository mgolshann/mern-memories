
import * as api from '../api';
import * as type from '../type';

// action to fetch user posts
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();
        dispatch({ type: type.FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// action to create new post 
export const createPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.createPost(newPost)
        dispatch({ type: type.CREATE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// update post
export const updatePost = (currentPostId, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(currentPostId, updatedPost)
        dispatch({ type: type.UPDATE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// delete post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId);
        dispatch({ type: type.DELETE_POST, payload: postId })
    } catch (error) {
        console.log(error)
    }
}

// like post
export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId);
        dispatch({ type: type.LIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// dislike post
export const disLikePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.disLikePost(postId);
        dispatch({ type: type.DISLIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}