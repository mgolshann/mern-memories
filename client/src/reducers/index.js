import { combineReducers } from 'redux';

// import reducers
import auth from './auth'
import posts from './posts';

export default combineReducers({ posts, auth })