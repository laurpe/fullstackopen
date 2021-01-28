const initialState = null

const notificationReducer = (state = initialState, action) => {
    console.log('notification state now:', state)
    console.log('notification action:', action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer