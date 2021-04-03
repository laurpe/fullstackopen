import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import Button from './Button'
import FormDiv from './FormDiv'
import Form from './Form'


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
            <h1>Blog app</h1>
            <h2>Log in</h2>
            <FormDiv>
                <Form onSubmit={handleLogin}>
                    <div>
                    username
                    </div>
                    <div>
                        <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                    password
                    </div>
                    <div>
                        <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <Button id="login-button" type="submit">login</Button>
                </Form>
            </FormDiv>
        </div>
    )
}

export default LoginForm