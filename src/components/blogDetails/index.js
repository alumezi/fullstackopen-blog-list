import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../../app/reducers/blogs'
import { setNotification } from '../../app/reducers/notification'
import { getUsers } from '../../app/reducers/users'

const BlogDetails = ({ userID, blogs }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const blog = blogs.find((item) => item.id === id)

  if (!blog) {
    return <></>
  }
  const deleteButtonStyle = {
    display: blog.user.id === userID ? '' : 'none',
  }

  const handleLike = async () => {
    const blogsCopy = [...blogs]
    const index = blogsCopy.findIndex((element) => element.id === id)
    const newBlog = blogsCopy[index]
    newBlog.likes++
    dispatch(updateBlog(newBlog))
    dispatch(
      setNotification({
        message: `You liked a blog ${newBlog.title}`,
        notificationType: 'notification',
      })
    )
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}`
      )
    ) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(getUsers())
        dispatch(
          setNotification({
            message: `Deleted ${blog.title} by ${blog.author}`,
            notificationType: 'notification',
          })
        )
        history.push('/blogs')
      } catch (err) {
        dispatch(
          setNotification({
            message: err.message,
            notificationType: 'error',
          })
        )
      }
    }
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <span className="blog-likes">{blog.likes}</span>
      <button data-testid="like-btn" onClick={handleLike}>
        like
      </button>
      added by {blog.author}{' '}
      <button style={deleteButtonStyle} onClick={handleDelete}>
        Remove
      </button>
    </>
  )
}

export default BlogDetails
