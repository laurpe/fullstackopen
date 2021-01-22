const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return initialState
        default:
            return initialState
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer