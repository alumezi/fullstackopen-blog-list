import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, userID }) => {
  const [showDetails, setShowDetails] = useState()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    display: blog.user.id === userID ? '' : 'none'
  }

  return <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
    <div className="detail-container" style={{ display: showDetails ? '' : 'none' }}>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => addLike(blog.id)}>like</button></div>
      <div>{blog.author}</div>
      <button style={deleteButtonStyle} onClick={() => removeBlog(blog)}>Remove</button>
    </div>
  </div>
}

export default Blog
