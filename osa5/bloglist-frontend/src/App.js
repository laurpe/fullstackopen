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
    setBlogs(blogs.concat(returnedBlog))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

          <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm createBlog={createBlog} setNotification={setNotification} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App