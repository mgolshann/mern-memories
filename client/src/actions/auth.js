import * as API from '../api'
import * as type from '../type'


export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await API.signin(formData);
        dispatch({ type: type.AUTH, data })
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await API.signup(formData);
        console.log(">>>>>>", data)
        dispatch({ type: type.AUTH, data })
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}