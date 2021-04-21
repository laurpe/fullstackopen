import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'


const Authors = (props) => {
    const [authorName, setAuthorName] = useState('')
    const [born, setBorn] = useState('')

    const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return <div>loading</div>
    }

    const authors = result.data.allAuthors

    const handleSubmit = async (event) => {
        event.preventDefault()

        await setBirthyear({ variables: { name: authorName, setBornTo: born } })

        setAuthorName('')
        setBorn('')
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <thead><tr>
                    <th></th>
                    <th>
                        born
                    </th>
                    <th>
                        books
                    </th>
                </tr>
                </thead>
                <tbody>

                    {authors.map(a =>
                        <tr key={a.id}>
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
                    <select value={authorName} onChange={({ target }) => setAuthorName(target.value)}>
                        {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
                    </select>
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