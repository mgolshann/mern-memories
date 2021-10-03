import * as type from '../type';

// state managment 
const postReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case type.START_LOADING: return { ...state, isLoading: true }
        case type.END_LOADING: return { ...state, isLoading: false }
        case type.FETCH_ALL: return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPage: action.payload.numberOfPage
        };
        case type.FETCH_BY_SEARCH: return { ...state, posts: action.payload };
        case type.LIKE_POST:
        case type.DISLIKE_POST:
        case type.UPDATE_POST: return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case type.CREATE_POST: return { ...state, posts: [...state, action.payload] };
        case type.DELETE_POST: return { ...state, posts: state.filter(post => post._id !== action.payload) };
        default: return state;
    }
}

export default postReducer