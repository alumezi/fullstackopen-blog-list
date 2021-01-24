import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Blog from '../components/Blog'
import BlogDetails from '../components/BlogDetails'
import Login from '../components/Login'
import Create from '../components/Create'
import Users from '../components/Users'
import User from '../components/User'
import Notification from '../components/Notification'
import Toggable from '../components/Toggable'
import { setNotification } from './reducers/notification'
import { createBlog as createBlogReducer, setBlogs } from './reducers/blogs'
import { setUser, removeUser } from './reducers/user'
import { getUsers } from './reducers/users'

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
      dispatch(getUsers())
    }
  }, [dispatch, user])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }

  const createBlog = async (newBlog) => {
    await dispatch(createBlogReducer(newBlog))
    dispatch(getUsers())
    setBlogFormVisibility(false)
    dispatch(
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        notificationType: 'notification',
      })
    )
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
    <Router>
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
      <Switch>
        <Route path="/blogs" exact>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails blogs={blogs} userID={user.id} />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
