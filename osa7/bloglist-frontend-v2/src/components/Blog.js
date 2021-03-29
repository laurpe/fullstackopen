import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogReducer'


const Blog = ({ user, handleLike, handleRemove }) => {
    const commentObject = { content: '' }
    const [comment, setComment] = useState(commentObject)

    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const dispatch = useDispatch()

    const addComment = (event) => {
        event.preventDefault()
        dispatch(commentBlog(blog.id, comment))
        setComment(commentObject)
    }

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
            <form onSubmit={addComment}>
                <input value={comment.content} onChange={(event) => {setComment({ ...commentObject, content: event.target.value })}}/>
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog