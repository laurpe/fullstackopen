import React, { useState } from 'react'


const CreateBlogForm = ({ addNewBlog }) => {
    const blogObject = { title: '', author: '', url: '' }
    const [newBlog, setNewBlog] = useState(blogObject)

    const handleNewBlog = (event) => {
        event.preventDefault()
        addNewBlog(newBlog)
        setNewBlog(blogObject)
    }

    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={handleNewBlog}>
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