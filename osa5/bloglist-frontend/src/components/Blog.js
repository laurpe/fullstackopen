import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, user }) => {
  const [blogDetails, setBlogDetails] = useState(false)

  const hideDetails = { display: blogDetails ? 'none' : '' }
  const showDetails = { display: blogDetails ? '' : 'none' }

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
      <div style={hideDetails}>
        {blog.title} by {blog.author} <button onClick={() => setBlogDetails(true)}>view</button>
      </div>
      <div style={showDetails}>
        {blog.title} by {blog.author} <button onClick={() => setBlogDetails(false)}>hide</button> <br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button><br />
        added by: {blog.user.name ?? user.name}
      </div>
    </div>
  )
}

export default Blog
