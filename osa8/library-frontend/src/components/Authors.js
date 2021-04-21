import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'


const Authors = (props) => {
    const [authorName, setAuthorName] = useState('')
    const [born, setBorn] = useState('')

    const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    if (!props.show) {
        return null
    }

    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return <div>loading</div>
    }

    const authors = result.data.allAuthors

    const handleSubmit = async (event) => {
        event.preventDefault()

        setBirthyear({ variables: { name: authorName, setBornTo: born } })

        setAuthorName('')
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                        born
                        </th>
                        <th>
                        books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h3>set birthyear</h3>
            <form onSubmit={handleSubmit}>
                <div>name:
                    <input type="text" value={authorName} onChange={({ target }) => setAuthorName(target.value)} />
                </div>
                <div>born:
                    <input type="number" value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default Authors