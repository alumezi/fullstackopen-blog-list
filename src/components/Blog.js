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

  return <div className="blog-container" style={blogStyle}>
    {blog.title} {blog.author} <button data-testid="view-btn" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
    <div className="detail-container" style={{ display: showDetails ? '' : 'none' }}>
      <div>{blog.url}</div>
      <div className="blog-likes">{blog.likes} <button data-testid="like-btn" onClick={() => addLike(blog.id)}>like</button></div>
      <div>{blog.author}</div>
      <button style={deleteButtonStyle} onClick={() => removeBlog(blog)}>Remove</button>
    </div>
  </div>
}

export default Blog
