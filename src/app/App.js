import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Blog from '../components/blog'
import BlogDetails from '../components/blogDetails'
import Login from '../components/login'
import Create from '../components/create'
import Users from '../components/users'
import User from '../components/user'
import Navigation from '../components/navigation'
import Notification from '../components/notification'
import Toggable from '../components/toggable'
import { setNotification } from './reducers/notification'
import { createBlog as createBlogReducer, setBlogs } from './reducers/blogs'
import { setUser } from './reducers/user'
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
      <Navigation name={user.name} />
      <Toggable
        buttonLabel="new note"
        visible={blogFormVisibility}
        toggle={setBlogFormVisibility}
      >
        <Create createBlog={createBlog} />
      </Toggable>
      <Switch>
        <Route path={['/', '/blogs']} exact>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails blogs={blogs} userID={user.id} />
        </Route>
        <Route path="/users" exact component={Users} />
        <Route path="/users/:id" component={User} />
      </Switch>
    </Router>
  )
}

export default App
