import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'



const CreateBlogForm = ({ createBlog }) => {
    const blogObject = { title: '', author: '', url: '' }
    const [newBlog, setNewBlog] = useState(blogObject)

    const dispatch = useDispatch()

    const addNewBlog = async (event) => {
        event.preventDefault()
        createBlog(newBlog)
        dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 'notification' ))
        setNewBlog(blogObject)
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={addNewBlog}>
                <div>
          title:
                    <input id='title' type="text" value={newBlog.title} name="Title" onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })} />
                </div>
                <div>
          author:
                    <input id='author' type="text" value={newBlog.author} name="Author" onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })} />
                </div>
                <div>
          url:
                    <input id='url' type="text" value={newBlog.url} name="Url" onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })} />
                </div>
                <button id="create-blog-button" type="submit">add blog</button>
            </form>
        </div>
    )
}

export default CreateBlogForm