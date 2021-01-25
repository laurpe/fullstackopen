const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return ''
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default notificationReducer