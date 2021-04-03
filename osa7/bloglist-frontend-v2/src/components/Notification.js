import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'


const StyledNotification = styled.div`
        color: white;
        background-color: ${props => props.notificationStyle === 'error' ? '#d44000' : '#289672'};
        border-radius: 3px;
        padding: 10px;
        margin-bottom: 10px;
`

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if (notification === null) {
        return null
    }
    return (
        <StyledNotification notificationStyle={notification.style}>{notification.message}</StyledNotification>
    )
}


export default Notification