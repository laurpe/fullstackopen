import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'


const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    useEffect(() => {
        const token = localStorage.getItem('user-token')
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token !== null &&
                <button onClick={() => setPage('add')}>add book</button>
                }
                {token === null &&
                    <button onClick={() => setPage('login')}>login</button>
                }
                {token !== null &&
                    <button onClick={logout}>logout</button>
                }
            </div>
            {page === 'authors' &&
            <Authors token={token} />
            }
            {page === 'books' &&
            <Books />
            }
            {page === 'add' &&
            <NewBook />
            }
            {page === 'login' &&
                <Login setToken={setToken} />
            }

        </div>
    )
}

export default App