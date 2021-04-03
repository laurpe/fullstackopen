import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogReducer'
import Button from './Button'
import DetailedView from './DetailedView'
import Form from './Form'
import FormDiv from './FormDiv'
import List from './List'


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
            <DetailedView>
                <h2>{blog.title}</h2>
                <a href={`http://${blog.url}`}>{blog.url}</a> <br />
            likes: {blog.likes} <Button onClick={() => handleLike(blog)}>like</Button><br />
            added by: {blog.user.name ? blog.user.name : user.name} <br />
                {blog.user.name === user.name && <Button onClick={() => handleRemove(blog)}>remove</Button>}
            </DetailedView>
            <h2>Comments</h2>
            <FormDiv>
                <Form onSubmit={addComment}>
                    <div>
                        comment
                    </div>
                    <div>
                        <input value={comment.content} onChange={(event) => {setComment({ ...commentObject, content: event.target.value })}}/>
                    </div>
                    <Button type="submit">add comment</Button>
                </Form>
            </FormDiv>
            <List>
                {blog.comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </List>
        </div>
    )
}

export default Blog