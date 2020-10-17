import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import { getAll, setToken } from './services/blogs'
import { login } from './services/login'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
    } catch{
      setNotification({ message: `Wrong credentials`, type: 'error' })
      setTimeout(() => setNotification({ message: '', type: '' }), 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const onCreate = newBlog => {
    setBlogFormVisibility(false)
    setBlogs(blogs.concat(newBlog))
    setNotification({ message: `A new blog ${newBlog.title} by ${newBlog.author} added`, type: 'notification' })
    setTimeout(() => setNotification({ message: '', type: '' }), 5000)
  }

  if (user === null) {
    return <div>
      <Notification message={notification.message} type={notification.type} />
      <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <span>{user.name} logged in</span>
        <button onClick={event => handleLogout(event)}>Logout</button>
      </div>
      <Toggable buttonLabel="new note" visible={blogFormVisibility} toggle={setBlogFormVisibility}>
        <Create onCreate={onCreate} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App