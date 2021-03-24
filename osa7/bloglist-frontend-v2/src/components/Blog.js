import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const Blog = ({ user, handleLike, handleRemove }) => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    if (blog === undefined) {
        return null
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={`http://${blog.url}`}>{blog.url}</a> <br />
            likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br />
            added by: {blog.user.name ? blog.user.name : user.name} <br />
            {blog.user.name === user.name && <button onClick={() => handleRemove(blog)}>remove</button>}
            <h3>comments</h3>
            <ul>
                {blog.comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
                <li></li>
            </ul>
        </div>
    )
}

export default Blog