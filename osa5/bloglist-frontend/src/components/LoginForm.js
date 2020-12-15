import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const LoginForm = ({ setUser, setNotification }) => {
    LoginForm.propTypes = {
        setUser: PropTypes.func.isRequired,
        setNotification: PropTypes.func.isRequired
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
            setNotification({ message: 'wrong username or password', type: 'error' })
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
          <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm