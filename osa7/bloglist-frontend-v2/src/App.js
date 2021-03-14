import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { logout } from './reducers/loginReducer'
import useLogin from './hooks/useLogin'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {

    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)

    const user = useLogin()

    const createBlogFormRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

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

        <Router>
            <div>
                <Notification />

                {user === null &&
                    <LoginForm />
                }

                {user !== null &&
                    <div className='blogs'>
                        <h2>Blogs</h2>
                        <p>{user.name} logged in <button type="button" onClick={() => dispatch(logout())}>logout</button></p>

                        <Switch>
                            <Route path='/users/:id'>
                                <User />
                            </Route>
                            <Route path='/'>
                                <h2>Users</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Blogs added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user =>
                                            <tr key={user.id}>
                                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                                <td>{user.blogs.length}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Route>
                        </Switch>

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
        </Router>
    )
}

export default App