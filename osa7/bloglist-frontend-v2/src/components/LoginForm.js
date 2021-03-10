import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'


const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await dispatch(login(username, password))
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 'error' ))
            setTimeout(() => {
                dispatch(clearNotification(null))
            }, 5000)
        }
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm