
import * as API from '../api';
import * as type from '../type';

// action to fetch user posts
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: type.START_LOADING })
        const { data } = await API.getPosts(page);
        dispatch({ type: type.FETCH_ALL, payload: data })
        dispatch({ type: type.END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: type.START_LOADING })
        {/*
        we have to destrucre the data two times.
        1- because we're making an axios request
        2- because we put it in a new object in the backend side where it has the data property
        */}
        const { data: { data } } = await API.fetchPostsBySearch(searchQuery)
        dispatch({ type: type.FETCH_BY_SEARCH, payload: data })
        dispatch({ type: type.END_LOADING })
        // 
    } catch (error) {
        console.log(error)
    }
}

// action to create new post 
export const createPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await API.createPost(newPost)
        dispatch({ type: type.CREATE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// update post
export const updatePost = (currentPostId, updatedPost) => async (dispatch) => {
    try {
        const { data } = await API.updatePost(currentPostId, updatedPost)
        dispatch({ type: type.UPDATE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// delete post
export const deletePost = (postId) => async (dispatch) => {
    try {
        dispatch({ type: type.START_LOADING })
        await API.deletePost(postId);
        dispatch({ type: type.DELETE_POST, payload: postId })
        dispatch({ type: type.END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

// like post
export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await API.likePost(postId);
        dispatch({ type: type.LIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// dislike post
export const disLikePost = (postId) => async (dispatch) => {
    try {
        const { data } = await API.disLikePost(postId);
        dispatch({ type: type.DISLIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}