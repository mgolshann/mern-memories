import { combineReducers } from 'redux';

// import reducers
import posts from './posts';
import auth from './auth'

export default combineReducers({ posts, auth })