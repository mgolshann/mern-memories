import * as type from '../type'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case type.AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        default:
            return state
    }
}