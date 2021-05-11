import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'


const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN_USER)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
        console.log('result data: ', result.data)
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        login({ variables: { username: username, password: password } })

        // setUsername('')
        // setPassword('')
    }

    return (
        <form onSubmit={submit}>
            <div>
                username
                <input value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div>
                <button type='submit'>login</button>
            </div>
        </form>
    )
}

export default Login