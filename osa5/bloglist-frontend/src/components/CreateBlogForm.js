import React, { useState } from 'react'


const CreateBlogForm = ({ createBlog, setNotification }) => {
    const blogObject = { title: '', author: '', url: '' }
    const [newBlog, setNewBlog] = useState(blogObject)

    const addNewBlog = async (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'notification' })
        setNewBlog(blogObject)
        setTimeout(() => {
            setNotification(null)
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
                <button type="submit">add blog</button>
            </form>
        </div>
    )
}

export default CreateBlogForm