import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({ message: '', type: '' })

    const createBlogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const createBlog = async (blogObject) => {
        createBlogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const updateBlog = async (blog) => {
        await blogService.update(blog.id, blog)
        const index = blogs.findIndex((oldBlog) => oldBlog.id === blog.id)
        const updatedBlogs = [...blogs]
        updatedBlogs[index] = blog
        setBlogs(updatedBlogs)
    }

    const removeBlog = async (blog) => {
        const index = blogs.findIndex((blogToDelete) => blogToDelete.id === blog.id)
        const blogsCopy = [...blogs]
        blogsCopy.splice(index, 1)

        await blogService.remove(blog.id)

        setBlogs(blogsCopy)
    }


    return (

        <div>
            {notification !== null &&
        <Notification notification={notification} />
            }

            {user === null &&
        <LoginForm setUser={setUser} setNotification={setNotification} />
            }

            {user !== null &&
        <div className='blogs'>
            <h2>blogs</h2>
            <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
                <CreateBlogForm createBlog={createBlog} setNotification={setNotification} />
            </Togglable>

            {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />
            )}
        </div>
            }

        </div>
    )
}

export default App