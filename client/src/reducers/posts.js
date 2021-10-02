import * as type from '../type';

// state managment 
const postReducer = (posts = [], action) => {
    switch (action.type) {
        case type.FETCH_ALL: return action.payload;
        case type.LIKE_POST: 
        case type.DISLIKE_POST: 
        case type.UPDATE_POST: return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case type.CREATE_POST: return [...posts, action.payload];
        case type.DELETE_POST: return posts.filter(post => post._id !== action.payload);
        default: return posts;
    }
}

export default postReducer