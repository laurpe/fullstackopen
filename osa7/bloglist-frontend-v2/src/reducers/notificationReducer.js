const notificationReducer = (state = null, action) => {
    if (action.type === 'SET_NOTIFICATION') {
        return action.data
    }
    if (action.type === 'CLEAR_NOTIFICATION') {
        return null
    }
    return state
}

export const setNotification = (message, style) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { message, style }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer