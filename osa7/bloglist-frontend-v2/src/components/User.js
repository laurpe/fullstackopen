import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const User = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (users.length === 0 || user === undefined) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs</h4>
            <ul>
                {user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

export default User