import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import Login from '../components/Login'
import Create from '../components/Create'
import Notification from '../components/Notification'
import Toggable from '../components/Toggable'
import { setNotification } from './reducers/notification'
import {
  createBlog as createBlogReducer,
  updateBlog,
  setBlogs,
  deleteBlog,
} from './reducers/blogs'
import { setUser, removeUser } from './reducers/user'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { user } = useSelector((state) => state.userData)
  const [blogFormVisibility, setBlogFormVisibility] = useState(false)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    if (user.id) {
      dispatch(setBlogs())
    }
  }, [dispatch, user])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }

  const createBlog = async (newBlog) => {
    dispatch(createBlogReducer(newBlog))
    setBlogFormVisibility(false)
    dispatch(
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        notificationType: 'notification',
      })
    )
  }

  const handleLike = async (id) => {
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

  const handleDelete = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}`
      )
    ) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(
          setNotification({
            message: `Deleted ${blog.title} by ${blog.author}`,
            notificationType: 'notification',
          })
        )
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

  if (!user.id) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <span>{user.name} logged in</span>
        <button onClick={(event) => handleLogout(event)}>Logout</button>
      </div>
      <Toggable
        buttonLabel="new note"
        visible={blogFormVisibility}
        toggle={setBlogFormVisibility}
      >
        <Create createBlog={createBlog} />
      </Toggable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={handleLike}
          removeBlog={handleDelete}
          userID={user.id}
        />
      ))}
    </div>
  )
}

export default App
