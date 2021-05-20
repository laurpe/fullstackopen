import React from 'react'
import { ALL_BOOKS, LOGGED_USER } from '../queries'
import { useQuery } from '@apollo/client'


const Recommendations = () => {
    const user = useQuery(LOGGED_USER)
    const books = useQuery(ALL_BOOKS)

    if (user.loading) {
        return <div>loading user...</div>
    }

    const favoriteGenre = user.data.me.favoriteGenre

    if (books.loading) {
        return <div>loading favorite books...</div>
    }

    const booksOfFavoriteGenre = books.data.allBooks.filter(book => book.genres.includes(favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            books in your favourite genre <b>{favoriteGenre}</b>
            {<table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
              author
                        </th>
                        <th>
              published
                        </th>
                    </tr>
                    {booksOfFavoriteGenre.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>}
        </div>
    )
}

export default Recommendations