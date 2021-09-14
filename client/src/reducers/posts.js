import * as type from '../type';

export default (posts = [], action) => {
    switch(action.type) {
        case type.FETCH_ALL : return action.payload;
        case 'CREATE' : return posts;
        default: return posts;
    }
}