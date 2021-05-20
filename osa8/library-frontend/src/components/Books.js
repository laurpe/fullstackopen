import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
    const [getGenre, result] = useLazyQuery(ALL_BOOKS)
    const [booksByGenre, setBooksByGenre] = useState(null)
    const [genreToShow, setGenreToShow] = useState('')

    const showAll = () => {
        setBooksByGenre(null)
        setGenreToShow('')
    }

    const showGenre = (genre) => {
        getGenre({ variables: { genre: genre } })
        setGenreToShow(genre)
    }

    useEffect(() => {
        if (result.data) {
            setBooksByGenre(result.data.allBooks)
        }
    }, [result])

    const allBooks = useQuery(ALL_BOOKS)

    if (allBooks.loading) {
        return <div>loading</div>
    }

    const books = allBooks.data.allBooks

    const genres = [... new Set(books.map(book => book.genres).flat())]

    return (
        <div>
            <h2>books</h2>
            {booksByGenre &&
                    <p>in genre { genreToShow }</p>
            }
            <table>
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
                    {booksByGenre &&
                    booksByGenre.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                    {!booksByGenre &&
                    books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {genres.map(genre => <button key={genre} onClick={() => showGenre(genre)}>{genre}</button>)}
                <button onClick={() => showAll()}>all</button>
            </div>
        </div>
    )
}

export default Books