import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState(false)

  const hideDetails = { display: blogDetails ? 'none' : '' }
  const showDetails = { display: blogDetails ? '' : 'none' }

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
        likes: {blog.likes} <button>like</button><br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
