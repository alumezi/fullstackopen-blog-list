import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import Blog from '../components/Blog'
import Login from '../components/Login'
import Create from '../components/Create'
import { setToken, removeBlog } from '../services/blogs'
import { login } from '../services/login'
import Notification from '../components/Notification'
import Toggable from '../components/Toggable'
import { setNotification } from "./reducers/notification";
import { setBlogs } from "./reducers/blogs";
import { createBlog as createBlogReducer } from "./reducers/blogs";
import { updateBlog } from "./reducers/blogs";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisibility, setBlogFormVisibility] = useState(false)

  useEffect(() => {
    dispatch(setBlogs())
    }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error){
      dispatch(setNotification({message: error.message, notificationType: 'error'}))
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createBlog = async newBlog => {
    dispatch(createBlogReducer(newBlog))
    setBlogFormVisibility(false)
    dispatch(setNotification({message:`A new blog ${newBlog.title} by ${newBlog.author} added`, notificationType: 'notification'}))
  }

  const handleLike = async id => {
    const blogsCopy = [...blogs]
    const index = blogsCopy.findIndex(element => element.id === id)
    const newBlog = blogsCopy[index]
    newBlog.likes++
    dispatch(updateBlog(newBlog))
    dispatch(setNotification({message:`You liked a blog ${newBlog.title}`, notificationType: 'notification'}))
  }

  const handleDelete = async blog => {
    if(window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)){
      try{
        await removeBlog(blog.id)
        dispatch(setBlogs(blogs.filter(element => element.id !== blog.id)))
        dispatch(setNotification({message: `Deleted ${blog.title} by ${blog.author}`, notificationType: 'notification'}))
      } catch(err){
        dispatch(setNotification({message : err.message, notificationType: 'error'}))
      }
    }
  }

  if (user === null) {
    return <div>
      <Notification />
      <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>
        <span>{user.name} logged in</span>
        <button onClick={event => handleLogout(event)}>Logout</button>
      </div>
      <Toggable buttonLabel="new note" visible={blogFormVisibility} toggle={setBlogFormVisibility}>
        <Create createBlog={createBlog} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={handleLike} removeBlog={handleDelete} userID={user.id} />
      )}
    </div>
  )
}

export default App