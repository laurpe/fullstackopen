import React, { useState } from 'react'
import Button from './Button'
import Form from './Form'
import FormDiv from './FormDiv'


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
            <h2>Create new blog</h2>
            <FormDiv>
                <Form onSubmit={handleNewBlog}>
                    <div>
                    title
                    </div>
                    <div>
                        <input id='title' type="text" value={newBlog.title} name="Title" onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })} />
                    </div>
                    <div>
                    author
                    </div>
                    <div>
                        <input id='author' type="text" value={newBlog.author} name="Author" onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })} />
                    </div>
                    <div>
                    url
                    </div>
                    <div>
                        <input id='url' type="text" value={newBlog.url} name="Url" onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })} />
                    </div>
                    <Button id="create-blog-button" type="submit">add blog</Button>
                </Form>
            </FormDiv>
        </div>
    )
}

export default CreateBlogForm