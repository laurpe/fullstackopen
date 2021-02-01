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

var timeoutId = null

export const setNotification = (notification, time) => {
    return dispatch => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })

        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
            timeoutId = null
        }, time * 1000)
    }
}

const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer