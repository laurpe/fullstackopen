import loginService from '../services/login.js'
import blogService from '../services/blogs.js'

const loginReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN_USER':
        return action.data
    case 'LOGOUT_USER':
        return action.data
    case 'SET_USER':
        return action.data
    default:
        return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })

    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    return {
        type: 'LOGOUT_USER',
        data: null
    }
}

export const setUser = (user) => {
    blogService.setToken(user.token)
    return {
        type: 'SET_USER',
        data: user
    }
}

export default loginReducer