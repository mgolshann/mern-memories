
import * as api from '../api';
import * as type from '../type';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();
        dispatch({ type: type.FETCH_ALL, payload: data })
    } catch (err) {
        console.log(err.message)
    }
}