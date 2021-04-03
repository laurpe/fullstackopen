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
import Button from './components/Button'
import Table from './components/Table'
import Navbar from './components/Navbar'
import List from './components/List'


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

    const padding = {
        padding: 5
    }

    return (

        <Router>
            <div className='container'>
                <Notification />

                {user === null &&
                    <LoginForm />
                }

                {user !== null &&
                    <div>
                        <Navbar>
                            BlogApp
                            <Link style={padding} to='/'>blogs</Link>
                            <Link style={padding} to='/users'>users</Link>
                            {user.username} logged in <Button type="button" onClick={() => dispatch(logout())}>logout</Button>
                        </Navbar>
                        <div className='blogs'>
                            <Switch>
                                <Route path='/users/:id'>
                                    <User />
                                </Route>
                                <Route path='/blogs/:id'>
                                    <Blog user={user} handleLike={handleLike} handleRemove={handleRemove} />
                                </Route>
                                <Route path='/users'>
                                    <h2>Users</h2>
                                    <Table>
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
                                    </Table>
                                </Route>
                                <Route path='/'>
                                    <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
                                        <CreateBlogForm addNewBlog={addNewBlog}/>
                                    </Togglable>

                                    <List>
                                        {blogs.map(blog =>
                                            <li className='blog' key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></li>
                                        )}
                                    </List>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                }
            </div>
        </Router>
    )
}

export default App