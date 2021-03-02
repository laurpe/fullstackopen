import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { createBlog, likeBlog, removeBlog } from './reducers/blogReducer'


const App = () => {
    const [user, setUser] = useState(null)

    const blogs = useSelector(state => state.blogs)

    const createBlogFormRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addNewBlog = async (blog) => {
        dispatch(createBlog(blog))
        createBlogFormRef.current.toggleVisibility()
        dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added`, 'notification' ))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    const handleLike = (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
            id: blog.id
        }
        dispatch(likeBlog(newBlog))
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
            dispatch(removeBlog(blog))
        }
    }

    return (

        <div>
            <Notification />

            {user === null &&
        <LoginForm setUser={setUser} />
            }

            {user !== null &&
        <div className='blogs'>
            <h2>blogs</h2>
            <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
                <CreateBlogForm addNewBlog={addNewBlog}/>
            </Togglable>

            <ul className='bloglist'>
                {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
                    <li className='blog' key={blog.id}><Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} /></li>
                )}
            </ul>
        </div>
            }

        </div>
    )
}

export default App