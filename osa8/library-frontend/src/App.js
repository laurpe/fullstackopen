import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'


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

    const updateCacheWith = async (addedBook) => {
        const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

        const dataInStore = client.readQuery({ query: ALL_BOOKS })

        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks : [...dataInStore.allBooks, addedBook] }
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`New book titled ${addedBook.title} added`)
            updateCacheWith(addedBook)
        }
    })

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token !== null &&
                <button onClick={() => setPage('add')}>add book</button>
                }
                {token !== null &&
                <button onClick={() => setPage('recommendations')}>recommendations</button>}
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
            {page === 'add' && token !== null &&
            <NewBook updateCacheWith={updateCacheWith} />
            }
            {page === 'recommendations' && token !== null &&
            <Recommendations />
            }
            {page === 'login' &&
                <Login setToken={setToken} />
            }

        </div>
    )
}

export default App