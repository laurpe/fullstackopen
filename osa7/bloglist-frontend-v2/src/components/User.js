import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import List from './List'


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
            <List>
                {user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </List>
        </div>
    )
}

export default User