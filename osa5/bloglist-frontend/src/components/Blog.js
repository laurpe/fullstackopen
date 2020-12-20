import React, { useState } from 'react'


const Blog = ({ blog, updateBlog, user, removeBlog }) => {
    const [blogDetails, setBlogDetails] = useState(false)

    const handleLike = (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
            id: blog.id
        }
        updateBlog(newBlog)
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginTop: 2,
    }


    return (
        <div style={blogStyle}>
            {blogDetails === false && (
                <div>
                    {blog.title} by {blog.author} <button onClick={() => setBlogDetails(true)}>view</button>
                </div>
            )}

            {blogDetails === true && (
                <div>
                    {blog.title} by {blog.author} <button onClick={() => setBlogDetails(false)}>hide</button> <br />
                    {blog.url} <br />
                    likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br />
                    added by: {blog.user.name ? blog.user.name : user.name} <br />
                    {blog.user.name === user.name && <button onClick={() => handleRemove(blog)}>remove</button>}
                </div>
            )}
        </div>
    )
}

export default Blog
