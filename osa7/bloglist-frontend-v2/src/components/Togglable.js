import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = React.forwardRef((props, ref) => {
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    Togglable.displayName = 'Togglable'

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

export default Togglable