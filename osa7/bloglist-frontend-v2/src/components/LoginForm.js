import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const LoginForm = ({ setUser }) => {
    LoginForm.propTypes = {
        setUser: PropTypes.func.isRequired
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setUser(user)
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